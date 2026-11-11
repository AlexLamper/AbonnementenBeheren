import type { Preset } from "@/lib/presets/types";

export const efteling: Preset = {
  id: "efteling",
  name: "Efteling",
  category: "Uitjes & Cultuur",
  logoUrl: "https://www.google.com/s2/favicons?domain=efteling.com&sz=64",
  color: "#8C1D40",
  affiliateUrl: "https://www.efteling.com/nl",
  plans: [
    { name: "Classic", price: 21.0, billingPeriod: "maandelijks" },
    { name: "Classic (jaarlijks)", price: 240.0, billingPeriod: "jaarlijks" },
    { name: "Plus", price: 28.5, billingPeriod: "maandelijks" },
    { name: "Plus (jaarlijks)", price: 310.0, billingPeriod: "jaarlijks" },
    { name: "Premium", price: 36.0, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 400.0, billingPeriod: "jaarlijks" },
  ],
};
