import type { BillingPeriod } from "@/lib/money";

export interface PresetPlan {
  /** Naam van het abonnement, bijv. "Family" of "Premium". */
  name: string;
  price: number;
  billingPeriod: BillingPeriod;
}

export interface Preset {
  /** Stabiele id, bijv. "spotify". */
  id: string;
  name: string;
  category: string;
  /** Logo-URL; component valt terug op een gekleurde initiaal bij fout. */
  logoUrl?: string;
  /** Accentkleur voor het lijstitem (hex). */
  color?: string;
  /** Voorbereid voor affiliate - nog niet getoond in v1. */
  affiliateUrl?: string;
  plans: PresetPlan[];
}
