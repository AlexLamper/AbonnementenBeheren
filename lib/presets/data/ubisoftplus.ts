import type { Preset } from "@/lib/presets/types";

export const ubisoftplus: Preset = {
  id: "ubisoftplus",
  name: "Ubisoft+",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=ubisoft.com&sz=64",
  color: "#0070FF",
  affiliateUrl: "https://store.ubisoft.com/nl/ubisoftplus",
  plans: [
    { name: "Classics", price: 7.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 17.99, billingPeriod: "maandelijks" },
  ],
};
