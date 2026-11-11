import type { Preset } from "@/lib/presets/types";

export const replit: Preset = {
  id: "replit",
  name: "Replit",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=replit.com&sz=64",
  color: "#F26207",
  affiliateUrl: "https://replit.com/pricing",
  plans: [
    { name: "Core", price: 21.64, billingPeriod: "maandelijks" },
    { name: "Core (jaarlijks)", price: 233.75, billingPeriod: "jaarlijks" },
    { name: "Pro", price: 108.22, billingPeriod: "maandelijks" },
  ],
};
