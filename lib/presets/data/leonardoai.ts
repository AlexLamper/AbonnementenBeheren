import type { Preset } from "@/lib/presets/types";

export const leonardoai: Preset = {
  id: "leonardoai",
  name: "Leonardo.Ai",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=leonardo.ai&sz=64",
  color: "#6E3CF7",
  affiliateUrl: "https://leonardo.ai/pricing",
  plans: [
    { name: "Apprentice", price: 12.99, billingPeriod: "maandelijks" },
    { name: "Apprentice (jaarlijks)", price: 129.86, billingPeriod: "jaarlijks" },
    { name: "Artisan", price: 32.47, billingPeriod: "maandelijks" },
    { name: "Maestro", price: 64.93, billingPeriod: "maandelijks" },
  ],
};
