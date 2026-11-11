import type { Preset } from "@/lib/presets/types";

export const poe: Preset = {
  id: "poe",
  name: "Poe",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=poe.com&sz=64",
  color: "#5D5CDE",
  affiliateUrl: "https://poe.com/",
  plans: [
    { name: "Subscription", price: 21.63, billingPeriod: "maandelijks" },
    { name: "Subscription (jaarlijks)", price: 216.44, billingPeriod: "jaarlijks" },
  ],
};
