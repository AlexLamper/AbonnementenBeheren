import type { Preset } from "@/lib/presets/types";

export const claude: Preset = {
  id: "claude",
  name: "Claude",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=claude.ai&sz=64",
  color: "#D97757",
  affiliateUrl: "https://claude.com/pricing",
  plans: [
    { name: "Pro", price: 21.78, billingPeriod: "maandelijks" },
    { name: "Pro (jaarlijks)", price: 217.8, billingPeriod: "jaarlijks" },
    { name: "Max", price: 108.9, billingPeriod: "maandelijks" },
    { name: "Ultra", price: 217.8, billingPeriod: "maandelijks" },
  ],
};
