import type { Preset } from "@/lib/presets/types";

export const setapp: Preset = {
  id: "setapp",
  name: "Setapp",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=setapp.com&sz=64",
  color: "#6E33FF",
  affiliateUrl: "https://setapp.com/pricing",
  plans: [
    { name: "Mac (maand)", price: 16.32, billingPeriod: "maandelijks" },
    { name: "Mac (jaar)", price: 117.48, billingPeriod: "jaarlijks" },
    { name: "Mac + iOS (maand)", price: 20.68, billingPeriod: "maandelijks" },
    { name: "Power User (maand)", price: 25.04, billingPeriod: "maandelijks" },
  ],
};
