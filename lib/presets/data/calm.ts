import type { Preset } from "@/lib/presets/types";

export const calm: Preset = {
  id: "calm",
  name: "Calm",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=calm.com&sz=64",
  color: "#4A6FDC",
  affiliateUrl: "https://www.calm.com/",
  plans: [
    { name: "Calm Premium", price: 14.99, billingPeriod: "maandelijks" },
    { name: "Calm Premium (jaarlijks)", price: 69.99, billingPeriod: "jaarlijks" },
  ],
};
