import type { Preset } from "@/lib/presets/types";

export const toverland: Preset = {
  id: "toverland",
  name: "Toverland",
  category: "Uitjes & Cultuur",
  logoUrl: "https://www.google.com/s2/favicons?domain=toverland.com&sz=64",
  color: "#6B2C91",
  affiliateUrl: "https://www.toverland.com/",
  plans: [
    { name: "Volwassene", price: 14.0, billingPeriod: "maandelijks" },
    { name: "Volwassene (jaarlijks)", price: 160.0, billingPeriod: "jaarlijks" },
    { name: "Kind", price: 10.5, billingPeriod: "maandelijks" },
    { name: "Kind (jaarlijks)", price: 120.0, billingPeriod: "jaarlijks" },
  ],
};
