import { User } from "@/lib/models/User";
import { Subscription } from "@/lib/models/Subscription";
import type { BillingPeriod } from "@/lib/money";
import { SITE_URL } from "@/lib/seo";

/** presetId van de automatische regel, zodat we hem kunnen herkennen. */
export const PREMIUM_PRESET_ID = "abonnementenbeheren-premium";

export type PaidPlan = { price: number; billingPeriod: BillingPeriod };

/** Het vaste plan: €1,99 per maand. */
export const DEFAULT_PAID_PLAN: PaidPlan = { price: 1.99, billingPeriod: "maandelijks" };

/**
 * Wie Premium koopt (op de site of in de app), krijgt "AbonnementenBeheren
 * Premium" er automatisch bij in zijn lijst. Eén keer per betaalde periode:
 * haal je hem zelf weg, dan komt hij niet terug zolang je Premium hebt.
 */
export async function addPremiumToList(userId: string, plan: PaidPlan = DEFAULT_PAID_PLAN) {
  const claimed = await User.findOneAndUpdate(
    { _id: userId, premiumListEntryAdded: { $ne: true } },
    { $set: { premiumListEntryAdded: true } },
    { projection: { _id: 1 } }
  );
  if (!claimed) return;
  const existing = await Subscription.exists({ userId, presetId: PREMIUM_PRESET_ID });
  if (existing) return;
  await Subscription.create({
    userId,
    name: "AbonnementenBeheren Premium",
    planName: "Premium",
    price: plan.price,
    billingPeriod: plan.billingPeriod,
    category: "AI & Software",
    presetId: PREMIUM_PRESET_ID,
    logoUrl: `${SITE_URL}/logo/logo.png`,
    color: "#2dd4bf",
    startDate: new Date(),
  });
}

/** Betaald Premium is gestopt: bij een volgende aankoop mag de regel weer. */
export async function resetPremiumListEntry(userId: string) {
  await User.updateOne({ _id: userId }, { $set: { premiumListEntryAdded: false } });
}
