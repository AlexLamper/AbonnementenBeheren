import type { Preset } from "@/lib/presets/types";

export const f1tv: Preset = {
  id: "f1tv",
  name: "F1 TV",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=formula1.com&sz=64",
  color: "#E10600",
  affiliateUrl: "https://f1tv.formula1.com/",
  plans: [
    { name: "Pro", price: 11.9, billingPeriod: "maandelijks" },
    { name: "Premium", price: 17.99, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 142.99, billingPeriod: "jaarlijks" },
  ],
};
