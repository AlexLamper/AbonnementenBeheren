import type { Preset } from "@/lib/presets/types";

export const grok: Preset = {
  id: "grok",
  name: "Grok",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=grok.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://x.ai/grok",
  plans: [
    { name: "Plus", price: 8.66, billingPeriod: "maandelijks" },
    { name: "Premium", price: 32.47, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 324.66, billingPeriod: "jaarlijks" },
    { name: "Super", price: 108.22, billingPeriod: "maandelijks" },
    { name: "Ultra", price: 216.44, billingPeriod: "maandelijks" },
  ],
};
