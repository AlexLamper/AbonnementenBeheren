import type { Preset } from "@/lib/presets/types";

export const midjourney: Preset = {
  id: "midjourney",
  name: "Midjourney",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.midjourney.com/account",
  plans: [
    { name: "Basic", price: 10.82, billingPeriod: "maandelijks" },
    { name: "Standard", price: 32.47, billingPeriod: "maandelijks" },
    { name: "Pro", price: 64.93, billingPeriod: "maandelijks" },
    { name: "Mega", price: 129.86, billingPeriod: "maandelijks" },
    { name: "Standard (jaarlijks)", price: 311.67, billingPeriod: "jaarlijks" },
  ],
};
