#!/usr/bin/env python3
"""Download the active App Store provisioning profile for the app from
App Store Connect, so it does not have to be stored as a GitHub secret.

Inputs (environment):
  APP_STORE_CONNECT_KEY_ID, APP_STORE_CONNECT_ISSUER_ID, APP_STORE_CONNECT_API_KEY_P8
  EXPECTED_BUNDLE_ID   - e.g. com.abonnementenbeheren.app
  PROFILE_OUT          - where to write the .mobileprovision file
"""

import base64
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

from resolve_version import make_token

API = "https://api.appstoreconnect.apple.com/v1"


def main():
    bundle_id = os.environ["EXPECTED_BUNDLE_ID"]
    out = os.environ["PROFILE_OUT"]
    token = make_token()

    query = urllib.parse.urlencode(
        {
            "filter[profileType]": "IOS_APP_STORE",
            "filter[profileState]": "ACTIVE",
            "include": "bundleId",
            "limit": "200",
        }
    )
    req = urllib.request.Request(
        f"{API}/profiles?{query}", headers={"Authorization": f"Bearer {token}"}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.load(resp)
    except urllib.error.HTTPError as e:
        print(f"::error::App Store Connect {e.code}: {e.read()[:300]!r}")
        sys.exit(1)

    bundle_ids = {
        inc["id"]: inc["attributes"]["identifier"]
        for inc in data.get("included", [])
        if inc.get("type") == "bundleIds"
    }
    matches = [
        p
        for p in data.get("data", [])
        if bundle_ids.get(
            (p.get("relationships", {}).get("bundleId", {}).get("data") or {}).get("id")
        )
        == bundle_id
    ]
    if not matches:
        print(
            f"::error::Geen actief App Store-profiel gevonden voor {bundle_id}. "
            "Maak er een op developer.apple.com (Profiles) of zet BUILD_PROVISION_PROFILE_BASE64."
        )
        sys.exit(1)

    matches.sort(key=lambda p: p["attributes"].get("expirationDate") or "", reverse=True)
    profile = matches[0]["attributes"]
    with open(out, "wb") as f:
        f.write(base64.b64decode(profile["profileContent"]))
    print(f"Profiel opgehaald: {profile.get('name')} (verloopt {profile.get('expirationDate')})")


if __name__ == "__main__":
    main()
