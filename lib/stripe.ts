import Stripe from "stripe";

// Tijdens `next build` is STRIPE_SECRET_KEY soms niet gezet; de dummy-sleutel
// voorkomt dat de constructor dan faalt. Live gebruikt Vercel de echte sleutel.
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_build_only",
  { typescript: true }
);

export type PremiumPlan = "monthly" | "yearly";

export function readPlan(value: unknown): PremiumPlan {
  return value === "yearly" ? "yearly" : "monthly";
}

export function priceIdFor(plan: PremiumPlan): string | undefined {
  return plan === "yearly"
    ? process.env.STRIPE_PRICE_YEARLY
    : process.env.STRIPE_PRICE_MONTHLY;
}

/** Statussen waarbij een Stripe-abonnement Premium geeft. */
export function stripeStatusGivesPremium(status: Stripe.Subscription.Status): boolean {
  return status === "active" || status === "trialing" || status === "past_due";
}

/** Origin voor terugkeer-URL's na Checkout of het klantportaal. */
export function siteOrigin(req: Request): string {
  const configured = process.env.NEXTAUTH_URL?.replace(/\/$/, "");
  if (configured) return configured;
  return new URL(req.url).origin;
}
