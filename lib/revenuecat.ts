import mongoose from "mongoose";
import { User } from "@/lib/models/User";

/**
 * RevenueCat (App Store / Google Play) → `premiumStore` op de gebruiker.
 * De app logt in RevenueCat in met het MongoDB-_id, dus `app_user_id` is
 * gelijk aan `User._id`.
 */

export const PREMIUM_ENTITLEMENT_ID =
  process.env.REVENUECAT_PREMIUM_ENTITLEMENT_ID ?? "premium";

type Entitlement = { expires_date?: string | null };
type SubscriberResponse = {
  subscriber?: { entitlements?: Record<string, Entitlement | undefined> };
};

/** Leest de live status bij RevenueCat (de bron van waarheid). */
export async function fetchStorePremium(
  appUserId: string
): Promise<{ premiumStore: boolean; storePremiumExpiresAt: Date | null }> {
  const apiKey = process.env.REVENUECAT_REST_API_KEY;
  if (!apiKey) throw new Error("REVENUECAT_REST_API_KEY ontbreekt");

  const res = await fetch(
    `https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`,
    { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`RevenueCat ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }

  const data = (await res.json()) as SubscriberResponse;
  const ent = data.subscriber?.entitlements?.[PREMIUM_ENTITLEMENT_ID];
  if (!ent) return { premiumStore: false, storePremiumExpiresAt: null };

  // expires_date null = levenslang; een datum in het verleden = verlopen.
  const expires = ent.expires_date ? new Date(ent.expires_date) : null;
  const active = !expires || expires.getTime() > Date.now();
  return { premiumStore: active, storePremiumExpiresAt: active ? expires : null };
}

export async function syncStorePremium(appUserId: string): Promise<boolean> {
  if (!mongoose.Types.ObjectId.isValid(appUserId)) {
    // Anonieme RevenueCat-id's ($RCAnonymousID:...) horen bij niemand.
    return false;
  }
  const patch = await fetchStorePremium(appUserId);
  const result = await User.updateOne({ _id: appUserId }, { $set: patch });
  return result.matchedCount > 0;
}
