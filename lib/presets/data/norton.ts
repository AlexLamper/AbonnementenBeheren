import type { Preset } from "@/lib/presets/types";

export const norton: Preset = {
  id: "norton",
  name: "Norton 360",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=norton.com&sz=64",
  color: "#FFC700",
  affiliateUrl: "https://nl.norton.com/products",
  plans: [
    { name: "360 Standard (jaar)", price: 74.99, billingPeriod: "jaarlijks" },
    { name: "360 Deluxe (jaar)", price: 104.99, billingPeriod: "jaarlijks" },
    { name: "360 Premium (jaar)", price: 114.99, billingPeriod: "jaarlijks" },
  ],
};
