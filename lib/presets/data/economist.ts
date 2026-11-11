import type { Preset } from "@/lib/presets/types";

export const economist: Preset = {
  id: "economist",
  name: "The Economist",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=economist.com&sz=64",
  color: "#E3120B",
  affiliateUrl: "https://www.economist.com/subscribe",
  plans: [
    { name: "Digital", price: 24.9, billingPeriod: "maandelijks" },
    { name: "Digital (jaarlijks)", price: 249.0, billingPeriod: "jaarlijks" },
  ],
};
