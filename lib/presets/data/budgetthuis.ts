import type { Preset } from "@/lib/presets/types";

export const budgetthuis: Preset = {
  id: "budgetthuis",
  name: "Budget Thuis",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=budgetthuis.nl&sz=64",
  color: "#7AB929",
  affiliateUrl: "https://www.budgetthuis.nl/",
  plans: [
    { name: "Glasvezel 100 Mbit/s", price: 45.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 500 Mbit/s", price: 52.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 1 Gbit/s", price: 56.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 100 Mbit/s + TV", price: 60.0, billingPeriod: "maandelijks" },
  ],
};
