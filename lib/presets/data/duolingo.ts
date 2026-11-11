import type { Preset } from "@/lib/presets/types";

export const duolingo: Preset = {
  id: "duolingo",
  name: "Duolingo",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=duolingo.com&sz=64",
  color: "#58CC02",
  affiliateUrl: "https://www.duolingo.com/",
  plans: [
    { name: "Super", price: 12.99, billingPeriod: "maandelijks" },
    { name: "Super (jaarlijks)", price: 83.99, billingPeriod: "jaarlijks" },
    { name: "Max", price: 29.99, billingPeriod: "maandelijks" },
    { name: "Max (jaarlijks)", price: 167.99, billingPeriod: "jaarlijks" },
  ],
};
