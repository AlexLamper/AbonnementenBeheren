import type { SubscriptionDoc } from "@/lib/models/Subscription";
import type { ClientSubscription } from "@/lib/types";

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
