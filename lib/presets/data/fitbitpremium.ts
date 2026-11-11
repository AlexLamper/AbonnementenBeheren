import type { Preset } from "@/lib/presets/types";

export const fitbitpremium: Preset = {
  id: "fitbitpremium",
  name: "Fitbit Premium",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=fitbit.com&sz=64",
  color: "#00B0B9",
  affiliateUrl: "https://www.fitbit.com/global/nl/products/services/premium",
  plans: [
    { name: "Premium", price: 8.99, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 79.99, billingPeriod: "jaarlijks" },
  ],
};
