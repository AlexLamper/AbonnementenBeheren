import type { Preset } from "@/lib/presets/types";

export const otter: Preset = {
  id: "otter",
  name: "Otter.ai",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=otter.ai&sz=64",
  color: "#3B82F6",
  affiliateUrl: "https://otter.ai/pricing",
  plans: [
    { name: "Pro", price: 18.39, billingPeriod: "maandelijks" },
    { name: "Pro (jaarlijks)", price: 108.18, billingPeriod: "jaarlijks" },
  ],
};
