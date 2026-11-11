import type { Preset } from "@/lib/presets/types";

export const suno: Preset = {
  id: "suno",
  name: "Suno",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=suno.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://suno.com/pricing",
  plans: [
    { name: "Pro", price: 10.82, billingPeriod: "maandelijks" },
    { name: "Premier", price: 32.47, billingPeriod: "maandelijks" },
    { name: "Pro (jaarlijks)", price: 103.89, billingPeriod: "jaarlijks" },
    { name: "Premier (jaarlijks)", price: 311.67, billingPeriod: "jaarlijks" },
  ],
};
