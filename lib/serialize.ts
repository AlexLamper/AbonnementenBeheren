import type { SubscriptionDoc } from "@/lib/models/Subscription";
import type { ClientSubscription } from "@/lib/types";
import { findBrandIcon, type BrandIcon } from "@/lib/brandIcons";

export function toClient(doc: SubscriptionDoc): ClientSubscription {
  return {
    id: doc._id.toString(),
    name: doc.name,
    planName: doc.planName || undefined,
    price: doc.price,
    billingPeriod: doc.billingPeriod,
    category: doc.category || undefined,
    presetId: doc.presetId || undefined,
    logoUrl: doc.logoUrl || undefined,
    color: doc.color || undefined,
    notes: doc.notes || undefined,
  };
}

/** Vorm voor de app: hetzelfde plus het merkicoon en de aanmaakdatum. */
export function toMobile(
  doc: SubscriptionDoc
): ClientSubscription & { brand: BrandIcon | null; createdAt: string | null } {
  const base = toClient(doc);
  return {
    ...base,
    brand: findBrandIcon(base.presetId, base.name) ?? null,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
  };
}

export function serializeFor(mobile: boolean) {
  return mobile ? toMobile : toClient;
}
