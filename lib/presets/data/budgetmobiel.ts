import type { Preset } from "@/lib/presets/types";

export const budgetmobiel: Preset = {
  id: "budgetmobiel",
  name: "Budget Mobiel",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=budgetthuis.nl&sz=64",
  color: "#7AB929",
  affiliateUrl: "https://www.budgetthuis.nl/mobiel/sim-only-abonnementen",
  plans: [
    { name: "5 GB", price: 7.0, billingPeriod: "maandelijks" },
    { name: "10 GB", price: 8.0, billingPeriod: "maandelijks" },
    { name: "30 GB", price: 10.0, billingPeriod: "maandelijks" },
    { name: "Unlimited", price: 20.0, billingPeriod: "maandelijks" },
  ],
};
