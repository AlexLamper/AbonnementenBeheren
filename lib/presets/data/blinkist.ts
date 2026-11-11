import type { Preset } from "@/lib/presets/types";

export const blinkist: Preset = {
  id: "blinkist",
  name: "Blinkist",
  category: "Boeken",
  logoUrl: "https://www.google.com/s2/favicons?domain=blinkist.com&sz=64",
  color: "#2CE080",
  affiliateUrl: "https://www.blinkist.com/",
  plans: [
    { name: "Premium", price: 14.99, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 89.99, billingPeriod: "jaarlijks" },
  ],
};
