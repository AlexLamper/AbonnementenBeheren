import type { Preset } from "@/lib/presets/types";

export const metahorizonplus: Preset = {
  id: "metahorizonplus",
  name: "Meta Horizon+",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=meta.com&sz=64",
  color: "#0081FB",
  affiliateUrl: "https://www.meta.com/nl/meta-horizon-plus/",
  plans: [
    { name: "Meta Horizon+", price: 7.99, billingPeriod: "maandelijks" },
    { name: "Meta Horizon+ (jaarlijks)", price: 59.99, billingPeriod: "jaarlijks" },
  ],
};
