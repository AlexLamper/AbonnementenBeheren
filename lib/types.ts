import type { BillingPeriod } from "@/lib/money";

/** Vorm waarin een abonnement naar de client gaat. */
export interface ClientSubscription {
  id: string;
  name: string;
  planName?: string;
  price: number;
  billingPeriod: BillingPeriod;
  category?: string;
  presetId?: string;
  logoUrl?: string;
  color?: string;
  notes?: string;
}
