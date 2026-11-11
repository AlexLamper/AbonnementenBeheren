import type { Preset } from "@/lib/presets/types";

export const bumble: Preset = {
  id: "bumble",
  name: "Bumble",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=bumble.com&sz=64",
  color: "#FFC629",
  affiliateUrl: "https://bumble.com/",
  plans: [
    { name: "Boost", price: 19.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 34.99, billingPeriod: "maandelijks" },
  ],
};
