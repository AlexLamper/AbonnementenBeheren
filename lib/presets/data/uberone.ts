import type { Preset } from "@/lib/presets/types";

export const uberone: Preset = {
  id: "uberone",
  name: "Uber One",
  category: "Eten & Bezorging",
  logoUrl: "https://www.google.com/s2/favicons?domain=uber.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.uber.com/nl/nl/u/uber-one/",
  plans: [
    { name: "Uber One", price: 5.99, billingPeriod: "maandelijks" },
    { name: "Uber One (jaarlijks)", price: 59.99, billingPeriod: "jaarlijks" },
  ],
};
