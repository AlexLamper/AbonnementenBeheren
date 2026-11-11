import type { Preset } from "@/lib/presets/types";

export const heygen: Preset = {
  id: "heygen",
  name: "HeyGen",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=heygen.com&sz=64",
  color: "#7559FF",
  affiliateUrl: "https://www.heygen.com/pricing",
  plans: [
    { name: "Creator", price: 31.38, billingPeriod: "maandelijks" },
    { name: "Creator (jaarlijks)", price: 311.67, billingPeriod: "jaarlijks" },
    { name: "Pro", price: 53.03, billingPeriod: "maandelijks" },
  ],
};
