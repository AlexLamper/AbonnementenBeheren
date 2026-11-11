import type { Preset } from "@/lib/presets/types";

export const ynab: Preset = {
  id: "ynab",
  name: "YNAB",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=ynab.com&sz=64",
  color: "#3B5BDB",
  affiliateUrl: "https://www.ynab.com/pricing",
  plans: [
    { name: "Maandelijks", price: 16.19, billingPeriod: "maandelijks" },
    { name: "Jaarlijks", price: 117.72, billingPeriod: "jaarlijks" },
  ],
};
