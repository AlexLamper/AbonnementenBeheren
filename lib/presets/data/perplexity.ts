import type { Preset } from "@/lib/presets/types";

export const perplexity: Preset = {
  id: "perplexity",
  name: "Perplexity",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=64",
  color: "#20808D",
  affiliateUrl: "https://www.perplexity.ai/pro",
  plans: [
    { name: "Pro", price: 21.64, billingPeriod: "maandelijks" },
    { name: "Pro (jaarlijks)", price: 216.44, billingPeriod: "jaarlijks" },
    { name: "Max", price: 216.44, billingPeriod: "maandelijks" },
    { name: "Max (jaarlijks)", price: 2164.39, billingPeriod: "jaarlijks" },
  ],
};
