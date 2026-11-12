#!/usr/bin/env python3
"""App Store Connect helper for the appstore-metadata workflow.

Commands:
  status   Print the app, its appStoreVersions and its appInfos with their states.
  prepare  Make sure an editable iOS App Store version exists (create one if not)
           and write APP_VERSION=<versionString> to $GITHUB_ENV for fastlane deliver.
           Also attaches the newest VALID build of that version's TestFlight train
           and writes BUILD_NUMBER to $GITHUB_ENV.
  configure  Content rights (DOES_NOT_USE_THIRD_PARTY_CONTENT), age rating from
           store/age_rating.json, free price (base territory NLD), App Review
           contact/notes, and primary locale (warning only if it fails).
  locale   Set the app's primary locale (default nl-NL). Run after deliver, because
           Apple only accepts a primary locale that already has a localization.

Extra environment for "configure": APP_REVIEW_EMAIL, APP_REVIEW_PHONE (each skipped
when empty), REVIEW_NOTES, AGE_RATING_PATH, BASE_TERRITORY.

Environment:
  APP_STORE_CONNECT_KEY_ID, APP_STORE_CONNECT_ISSUER_ID
  ASC_KEY_PATH                 path to a clean PEM .p8 file (preferred), or
  APP_STORE_CONNECT_API_KEY_P8 the key text (raw PEM with/without line breaks, or base64)
  ASC_APP_ID                   App Store Connect app id (default 6833970151)
  INPUT_APP_VERSION            optional: version string to use/create
  DEFAULT_APP_VERSION          used when nothing else is known (default 1.0)
  PRIMARY_LOCALE               for "locale" (default nl-NL)

Version choice for "prepare" (first match wins):
  1. INPUT_APP_VERSION, if set (an existing editable version is renamed by deliver).
  2. The versionString of the existing editable App Store version.
  3. The newest TestFlight train (preReleaseVersion), so a build can be attached.
  4. DEFAULT_APP_VERSION.
"""

import base64
import json
import os
import re
import sys
import time

import jwt
import requests

API = "https://api.appstoreconnect.apple.com/v1"
APP_ID = os.environ.get("ASC_APP_ID", "6833970151")

# States in which the version's metadata can still be edited.
EDITABLE_STATES = {
    "PREPARE_FOR_SUBMISSION",
    "DEVELOPER_REJECTED",
    "REJECTED",
    "METADATA_REJECTED",
    "INVALID_BINARY",
}


def log(msg):
    print(msg, flush=True)


def load_private_key():
    path = os.environ.get("ASC_KEY_PATH", "").strip()
    if path and os.path.exists(path):
        with open(path, encoding="utf-8") as handle:
            return handle.read()
    raw = os.environ.get("APP_STORE_CONNECT_API_KEY_P8", "").strip()
    if not raw:
        sys.exit("No API key: set ASC_KEY_PATH or APP_STORE_CONNECT_API_KEY_P8.")
    if "BEGIN PRIVATE KEY" not in raw:
        raw = base64.b64decode(re.sub(r"\s+", "", raw)).decode()
    # Same normalisation as ios-release.yml: rebuild a clean 64-column PEM.
    body = re.sub(
        r"\s+", "",
        raw.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", ""),
    )
    lines = [body[i:i + 64] for i in range(0, len(body), 64)]
    return "-----BEGIN PRIVATE KEY-----\n" + "\n".join(lines) + "\n-----END PRIVATE KEY-----\n"


def make_token():
    now = int(time.time())
    payload = {
        "iss": os.environ.get("APP_STORE_CONNECT_ISSUER_ID", "6de0d408-c678-4c60-9a6f-572cf850399d"),
        "iat": now,
        "exp": now + 15 * 60,
        "aud": "appstoreconnect-v1",
    }
    headers = {"kid": os.environ.get("APP_STORE_CONNECT_KEY_ID", "QS5UXPB9HY"), "typ": "JWT"}
    return jwt.encode(payload, load_private_key(), algorithm="ES256", headers=headers)


class Client:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers["Authorization"] = f"Bearer {make_token()}"

    def request(self, method, path, **kwargs):
        resp = self.session.request(method, f"{API}/{path}", timeout=60, **kwargs)
        if resp.status_code >= 400:
            raise RuntimeError(f"{method} {path} -> HTTP {resp.status_code}: {resp.text[:800]}")
        return resp.json() if resp.content else {}

    def get(self, path, params=None):
        return self.request("GET", path, params=params)


def fetch(client):
    app = client.get(f"apps/{APP_ID}")["data"]
    versions = client.get(
        f"apps/{APP_ID}/appStoreVersions",
        params={"limit": 200, "filter[platform]": "IOS"},
    )["data"]
    infos = client.get(f"apps/{APP_ID}/appInfos", params={"limit": 50})["data"]
    return app, versions, infos


def version_state(version):
    attrs = version["attributes"]
    return attrs.get("appStoreState") or attrs.get("appVersionState") or "?"


def cmd_status(client):
    app, versions, infos = fetch(client)
    attrs = app["attributes"]
    log(f"App {APP_ID}: {attrs.get('name')} ({attrs.get('bundleId')}), "
        f"primaryLocale={attrs.get('primaryLocale')}")
    log("appStoreVersions (IOS):")
    if not versions:
        log("  (none)")
    for v in versions:
        a = v["attributes"]
        log(f"  {a.get('versionString'):<10} appStoreState={a.get('appStoreState')} "
            f"appVersionState={a.get('appVersionState')} releaseType={a.get('releaseType')} "
            f"id={v['id']}")
        try:
            locs = client.get(f"appStoreVersions/{v['id']}/appStoreVersionLocalizations",
                              params={"limit": 50})["data"]
            log("    localizations: " + (", ".join(sorted(l["attributes"]["locale"] for l in locs)) or "none"))
        except RuntimeError as exc:
            log(f"    localizations: lookup failed ({exc})")
    log("appInfos:")
    for info in infos:
        a = info["attributes"]
        log(f"  id={info['id']} appStoreState={a.get('appStoreState')} state={a.get('state')} "
            f"ageRating={a.get('appStoreAgeRating')}")
        try:
            primary = client.get(f"appInfos/{info['id']}/primaryCategory").get("data")
            secondary = client.get(f"appInfos/{info['id']}/secondaryCategory").get("data")
            log(f"    primaryCategory={primary and primary['id']} "
                f"secondaryCategory={secondary and secondary['id']}")
        except RuntimeError as exc:
            log(f"    categories: lookup failed ({exc})")
    try:
        trains = client.get("preReleaseVersions",
                            params={"limit": 50, "filter[app]": APP_ID, "filter[platform]": "IOS"})["data"]
        log("TestFlight trains: " + (", ".join(t["attributes"]["version"] for t in trains) or "none"))
    except RuntimeError as exc:
        log(f"TestFlight trains: lookup failed ({exc})")


def parse_version(text):
    nums = [int(p) for p in re.findall(r"\d+", text or "")[:3]]
    return tuple(nums + [0] * (3 - len(nums)))


def emit(name, value):
    log(f"{name}={value}")
    env_file = os.environ.get("GITHUB_ENV")
    if env_file:
        with open(env_file, "a", encoding="utf-8") as handle:
            handle.write(f"{name}={value}\n")


def cmd_prepare(client):
    _, versions, _ = fetch(client)
    editable = [v for v in versions if version_state(v) in EDITABLE_STATES]
    requested = os.environ.get("INPUT_APP_VERSION", "").strip()

    if editable:
        current = editable[0]["attributes"]["versionString"]
        log(f"Editable version found: {current} ({version_state(editable[0])}).")
        if requested and requested != current:
            log(f"Requested version {requested}; deliver will rename {current} -> {requested}.")
        emit("APP_VERSION", requested or current)
        attach_build(client, editable[0]["id"], requested or current)
        return

    version = requested
    if not version:
        trains = client.get("preReleaseVersions",
                            params={"limit": 200, "filter[app]": APP_ID, "filter[platform]": "IOS"})["data"]
        names = [t["attributes"]["version"] for t in trains]
        live = {parse_version(v["attributes"]["versionString"]) for v in versions}
        candidates = [n for n in names if parse_version(n) not in live]
        if candidates:
            version = max(candidates, key=parse_version)
            log(f"Using newest TestFlight train {version} so its build can be attached.")
    version = version or os.environ.get("DEFAULT_APP_VERSION", "1.0")

    log(f"No editable App Store version; creating {version}.")
    created = client.request("POST", "appStoreVersions", json={
        "data": {
            "type": "appStoreVersions",
            "attributes": {"platform": "IOS", "versionString": version,
                           "releaseType": "MANUAL"},
            "relationships": {"app": {"data": {"type": "apps", "id": APP_ID}}},
        }
    })["data"]
    emit("APP_VERSION", version)
    attach_build(client, created["id"], version)


def attach_build(client, version_id, version_string):
    """Attach the newest VALID build of this version's TestFlight train.

    Writes BUILD_NUMBER to $GITHUB_ENV so deliver submits exactly that build.
    """
    trains = client.get(
        "preReleaseVersions",
        params={"limit": 200, "filter[app]": APP_ID, "filter[platform]": "IOS", "filter[version]": version_string},
    )["data"]
    if not trains:
        log(f"::warning::No TestFlight train {version_string}; no build to attach. "
            f"Upload a build with CFBundleShortVersionString {version_string} before submitting.")
        return
    builds = client.get(
        "builds",
        params={"filter[preReleaseVersion]": ",".join(t["id"] for t in trains),
                "filter[processingState]": "VALID", "filter[expired]": "false",
                "sort": "-uploadedDate", "limit": 50},
    )["data"]
    if not builds:
        log(f"::warning::No VALID build in train {version_string}; nothing attached.")
        return
    build = builds[0]
    number = build["attributes"]["version"]
    log(f"Attaching build {version_string} ({number}) id={build['id']}.")
    try:
        client.request("PATCH", f"appStoreVersions/{version_id}/relationships/build",
                       json={"data": {"type": "builds", "id": build["id"]}})
    except RuntimeError as exc:
        log(f"::warning::Could not attach build ({exc}); deliver will select it on submit.")
    emit("BUILD_NUMBER", number)


def editable_version(client):
    _, versions, _ = fetch(client)
    editable = [v for v in versions if version_state(v) in EDITABLE_STATES]
    return editable[0] if editable else None


def editable_app_info(client):
    infos = client.get(f"apps/{APP_ID}/appInfos", params={"limit": 50})["data"]
    live = {"READY_FOR_DISTRIBUTION", "READY_FOR_SALE", "REPLACED_WITH_NEW_INFO"}
    for info in infos:
        a = info["attributes"]
        if (a.get("state") or a.get("appStoreState")) not in live:
            return info
    return infos[0] if infos else None


def set_primary_locale(client):
    locale = os.environ.get("PRIMARY_LOCALE", "nl-NL")
    app = client.get(f"apps/{APP_ID}")["data"]
    current = app["attributes"].get("primaryLocale")
    if current == locale:
        log(f"Primary locale already {locale}.")
        return
    log(f"Changing primary locale {current} -> {locale}.")
    client.request("PATCH", f"apps/{APP_ID}", json={
        "data": {"type": "apps", "id": APP_ID, "attributes": {"primaryLocale": locale}}
    })
    log("Primary locale updated.")


def set_content_rights(client):
    value = os.environ.get("CONTENT_RIGHTS", "DOES_NOT_USE_THIRD_PARTY_CONTENT")
    client.request("PATCH", f"apps/{APP_ID}", json={
        "data": {"type": "apps", "id": APP_ID,
                 "attributes": {"contentRightsDeclaration": value}}
    })
    log(f"Content rights declaration set to {value}.")


def set_age_rating(client):
    path = os.environ.get("AGE_RATING_PATH", "store/age_rating.json")
    if not os.path.exists(path):
        log(f"::warning::{path} not found; age rating left unchanged.")
        return
    with open(path, encoding="utf-8") as handle:
        wanted = json.load(handle)
    info = editable_app_info(client)
    if not info:
        raise RuntimeError("No appInfo found for the age rating.")
    decl = client.get(f"appInfos/{info['id']}/ageRatingDeclaration")["data"]
    attrs = dict(wanted)
    # Apple renames/retires questions from time to time. Drop any attribute the
    # API rejects and retry, so one stale key cannot block the rest.
    for _ in range(len(wanted) + 1):
        try:
            client.request("PATCH", f"ageRatingDeclarations/{decl['id']}", json={
                "data": {"type": "ageRatingDeclarations", "id": decl["id"], "attributes": attrs}
            })
            log(f"Age rating declaration {decl['id']} updated ({len(attrs)} answers).")
            dropped = sorted(set(wanted) - set(attrs))
            if dropped:
                log(f"::warning::API rejected these age rating keys: {', '.join(dropped)}")
            return
        except RuntimeError as exc:
            bad = [k for k in attrs if f"/attributes/{k}" in str(exc) or f"'{k}'" in str(exc)]
            if not bad:
                raise
            for key in bad:
                attrs.pop(key)
    raise RuntimeError("Age rating PATCH kept failing.")


def set_free_price(client):
    territory = os.environ.get("BASE_TERRITORY", "NLD")
    try:
        schedule = client.get(f"apps/{APP_ID}/appPriceSchedule",
                              params={"include": "manualPrices,baseTerritory"})
        included = schedule.get("included", [])
        manual = [i for i in included if i["type"] == "appPrices"]
        if manual:
            log(f"Price schedule already exists ({len(manual)} manual price(s)); "
                f"checking whether it is free.")
    except RuntimeError:
        manual = []
    points = client.get(f"apps/{APP_ID}/appPricePoints",
                        params={"filter[territory]": territory, "limit": 200})["data"]
    free = [p for p in points if float(p["attributes"].get("customerPrice") or 0) == 0.0]
    if not free:
        raise RuntimeError(f"No free price point found for {territory}.")
    if manual:
        current_ids = set()
        for price in manual:
            rel = price.get("relationships", {}).get("appPricePoint", {}).get("data")
            if rel:
                current_ids.add(rel["id"])
        if current_ids and current_ids <= {p["id"] for p in free}:
            log("App is already free.")
            return
    client.request("POST", "appPriceSchedules", json={
        "data": {
            "type": "appPriceSchedules",
            "relationships": {
                "app": {"data": {"type": "apps", "id": APP_ID}},
                "baseTerritory": {"data": {"type": "territories", "id": territory}},
                "manualPrices": {"data": [{"type": "appPrices", "id": "${price0}"}]},
            },
        },
        "included": [{
            "type": "appPrices",
            "id": "${price0}",
            "attributes": {"startDate": None},
            "relationships": {
                "appPricePoint": {"data": {"type": "appPricePoints", "id": free[0]["id"]}}
            },
        }],
    })
    log(f"Price set to free (base territory {territory}).")


def set_review_details(client):
    version = editable_version(client)
    if not version:
        log("::warning::No editable version; review details not set.")
        return
    attrs = {
        "contactFirstName": os.environ.get("REVIEW_FIRST_NAME", "Alex"),
        "contactLastName": os.environ.get("REVIEW_LAST_NAME", "Lamper"),
        "demoAccountRequired": False,
        "notes": os.environ.get("REVIEW_NOTES", ""),
    }
    demo_name = os.environ.get("DEMO_ACCOUNT_NAME", "").strip()
    demo_password = os.environ.get("DEMO_ACCOUNT_PASSWORD", "").strip()
    if demo_name and demo_password:
        attrs.update({
            "demoAccountRequired": True,
            "demoAccountName": demo_name,
            "demoAccountPassword": demo_password,
        })
    else:
        log("::warning::No demo account set; App Review needs one because the app requires sign-in.")
    email = os.environ.get("APP_REVIEW_EMAIL", "").strip()
    phone = os.environ.get("APP_REVIEW_PHONE", "").strip()
    if email:
        attrs["contactEmail"] = email
    else:
        log("::warning::APP_REVIEW_EMAIL not set; review contact email left unchanged.")
    if phone:
        attrs["contactPhone"] = phone
    else:
        log("::warning::APP_REVIEW_PHONE not set; review contact phone left unchanged "
            "(Apple requires one before submission).")
    try:
        detail = client.get(f"appStoreVersions/{version['id']}/appStoreReviewDetail").get("data")
    except RuntimeError:
        detail = None
    if detail:
        client.request("PATCH", f"appStoreReviewDetails/{detail['id']}", json={
            "data": {"type": "appStoreReviewDetails", "id": detail["id"], "attributes": attrs}
        })
    else:
        client.request("POST", "appStoreReviewDetails", json={
            "data": {
                "type": "appStoreReviewDetails",
                "attributes": attrs,
                "relationships": {"appStoreVersion": {
                    "data": {"type": "appStoreVersions", "id": version["id"]}}},
            }
        })
    log("App review information saved.")


REVIEW_SHOT = os.path.join(os.path.dirname(__file__), "..", "..", "..", "store", "review", "paywall_review.png")


def upload_asset(client, create_type, rel_name, parent_id, path):
    """Reserve, upload and commit an image asset (App Store Connect asset flow)."""
    import hashlib
    data = open(path, "rb").read()
    res = client.request("POST", create_type, json={"data": {
        "type": create_type,
        "attributes": {"fileName": os.path.basename(path), "fileSize": len(data)},
        "relationships": {rel_name: {"data": {"type": "subscriptions", "id": parent_id}}},
    }})["data"]
    for op in res["attributes"]["uploadOperations"]:
        chunk = data[op["offset"]:op["offset"] + op["length"]]
        headers = {h["name"]: h["value"] for h in op.get("requestHeaders", [])}
        r = requests.request(op["method"], op["url"], data=chunk, headers=headers, timeout=120)
        r.raise_for_status()
    client.request("PATCH", f"{create_type}/{res['id']}", json={"data": {
        "type": create_type, "id": res["id"],
        "attributes": {"uploaded": True, "sourceFileChecksum": hashlib.md5(data).hexdigest()},
    }})
    return res["id"]


def set_subscription_review_shots(client):
    path = os.path.abspath(REVIEW_SHOT)
    if not os.path.exists(path):
        log("::warning::store/review/paywall_review.png missing; subscription review screenshot skipped.")
        return
    groups = client.get(f"apps/{APP_ID}/subscriptionGroups", params={"include": "subscriptions"})
    for sub in [i for i in groups.get("included", []) if i["type"] == "subscriptions"]:
        sid = sub["id"]
        current = client.request("GET", f"subscriptions/{sid}/appStoreReviewScreenshot")
        if current.get("data"):
            log(f"{sub['attributes']['productId']}: review screenshot already present.")
            continue
        upload_asset(client, "subscriptionAppStoreReviewScreenshots", "subscription", sid, path)
        log(f"{sub['attributes']['productId']}: review screenshot uploaded.")


def cmd_configure(client):
    """Content rights, age rating, free price, review details, primary locale."""
    failures = []
    for name, func, required in [
        ("content rights", set_content_rights, True),
        ("age rating", set_age_rating, True),
        ("price", set_free_price, True),
        ("review details", set_review_details, False),
        ("primary locale", set_primary_locale, False),
        ("subscription review screenshots", set_subscription_review_shots, False),
    ]:
        try:
            func(client)
        except Exception as exc:  # noqa: BLE001 - report every failure, then exit
            level = "error" if required else "warning"
            log(f"::{level}::{name}: {exc}")
            if required:
                failures.append(name)
    if failures:
        sys.exit(f"Failed: {', '.join(failures)}")


def cmd_locale(client):
    set_primary_locale(client)


def main():
    command = sys.argv[1] if len(sys.argv) > 1 else "status"
    handlers = {"status": cmd_status, "prepare": cmd_prepare,
                "configure": cmd_configure, "locale": cmd_locale}
    if command not in handlers:
        sys.exit(f"Unknown command {command}; use one of {', '.join(handlers)}.")
    handlers[command](Client())


if __name__ == "__main__":
    main()
