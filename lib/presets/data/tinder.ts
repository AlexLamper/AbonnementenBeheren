import type { Preset } from "@/lib/presets/types";

export const tinder: Preset = {
  id: "tinder",
  name: "Tinder",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=tinder.com&sz=64",
  color: "#FE3C72",
  affiliateUrl: "https://tinder.com/",
  plans: [
    { name: "Plus", price: 14.99, billingPeriod: "maandelijks" },
    { name: "Gold", price: 29.99, billingPeriod: "maandelijks" },
    { name: "Platinum", price: 39.99, billingPeriod: "maandelijks" },
  ],
};
