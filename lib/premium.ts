import { connectDB } from "@/lib/db";
import { User, type UserDoc } from "@/lib/models/User";
import { Subscription } from "@/lib/models/Subscription";

/**
 * Hoofdschakelaar voor betaalde functies. Staat hij uit, dan is alles
 * onbeperkt gratis zoals voorheen. Zo kan de code live staan voordat
 * Stripe en de App Store helemaal ingericht zijn.
 */
export const PREMIUM_ENABLED = process.env.PREMIUM_ENABLED === "true";

/** Aantal abonnementen dat je gratis kunt bijhouden. */
export const FREE_SUBSCRIPTION_LIMIT = (() => {
  const n = Number(process.env.FREE_SUBSCRIPTION_LIMIT);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 5;
})();

/** Getoonde prijzen op de website (de echte prijs staat in Stripe). */
export const PREMIUM_PRICES = {
  monthly: process.env.NEXT_PUBLIC_PREMIUM_PRICE_MONTHLY ?? "€ 1,99",
  yearly: process.env.NEXT_PUBLIC_PREMIUM_PRICE_YEARLY ?? "€ 14,99",
};

export type PremiumSource = "stripe" | "store" | "granted" | null;

type PremiumFields = Pick<
  UserDoc,
  "premiumStripe" | "premiumStore" | "storePremiumExpiresAt" | "premiumGranted"
>;

export function isStorePremiumActive(user: PremiumFields): boolean {
  if (!user.premiumStore) return false;
  // Een verlopen datum telt niet meer, ook als de webhook nog niet binnen is.
  if (user.storePremiumExpiresAt && user.storePremiumExpiresAt < new Date()) {
    return false;
  }
  return true;
}

export function premiumSource(user: PremiumFields | null | undefined): PremiumSource {
  if (!user) return null;
  if (user.premiumStripe) return "stripe";
  if (isStorePremiumActive(user)) return "store";
  if (user.premiumGranted) return "granted";
  return null;
}

export function isPremiumUser(user: PremiumFields | null | undefined): boolean {
  return premiumSource(user) !== null;
}

export interface Entitlement {
  /** Staat het betaalmodel aan? Zo niet, dan is `limit` null. */
  premiumEnabled: boolean;
  isPremium: boolean;
  source: PremiumSource;
  /** Maximum aantal abonnementen, of null voor onbeperkt. */
  limit: number | null;
  count: number;
  canAdd: boolean;
}

export async function getEntitlement(userId: string): Promise<Entitlement> {
  await connectDB();
  const [user, count] = await Promise.all([
    User.findById(userId)
      .select("premiumStripe premiumStore storePremiumExpiresAt premiumGranted")
      .lean<PremiumFields>(),
    Subscription.countDocuments({ userId }),
  ]);
  const source = premiumSource(user);
  const isPremium = source !== null;
  const limit = PREMIUM_ENABLED && !isPremium ? FREE_SUBSCRIPTION_LIMIT : null;
  return {
    premiumEnabled: PREMIUM_ENABLED,
    isPremium,
    source,
    limit,
    count,
    canAdd: limit === null || count < limit,
  };
}

/** Foutcode die web en app herkennen om de upgrade-vraag te tonen. */
export const LIMIT_REACHED = "LIMIT_REACHED";
