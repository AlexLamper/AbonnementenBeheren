import type { Preset } from "@/lib/presets/types";

export const ideogram: Preset = {
  id: "ideogram",
  name: "Ideogram",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=ideogram.ai&sz=64",
  color: "#000000",
  affiliateUrl: "https://ideogram.ai/pricing",
  plans: [
    { name: "Plus", price: 21.64, billingPeriod: "maandelijks" },
    { name: "Plus (jaarlijks)", price: 194.79, billingPeriod: "jaarlijks" },
    { name: "Pro", price: 64.93, billingPeriod: "maandelijks" },
    { name: "Pro (jaarlijks)", price: 545.43, billingPeriod: "jaarlijks" },
  ],
};
