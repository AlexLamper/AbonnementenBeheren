import type { Preset } from "@/lib/presets/types";

export const gamma: Preset = {
  id: "gamma",
  name: "Gamma",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=gamma.app&sz=64",
  color: "#6B2CF5",
  affiliateUrl: "https://gamma.app/pricing",
  plans: [
    { name: "Plus", price: 12.1, billingPeriod: "maandelijks" },
    { name: "Pro", price: 29.04, billingPeriod: "maandelijks" },
    { name: "Ultra", price: 104.06, billingPeriod: "maandelijks" },
    { name: "Plus (jaarlijks)", price: 116.16, billingPeriod: "jaarlijks" },
    { name: "Pro (jaarlijks)", price: 261.36, billingPeriod: "jaarlijks" },
  ],
};
