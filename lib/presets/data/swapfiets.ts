import type { Preset } from "@/lib/presets/types";

export const swapfiets: Preset = {
  id: "swapfiets",
  name: "Swapfiets",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=swapfiets.nl&sz=64",
  color: "#009FE3",
  affiliateUrl: "https://swapfiets.nl/",
  plans: [
    { name: "Original", price: 19.9, billingPeriod: "maandelijks" },
    { name: "Deluxe 7", price: 23.9, billingPeriod: "maandelijks" },
    { name: "Power 1", price: 64.9, billingPeriod: "maandelijks" },
    { name: "Power 7", price: 79.9, billingPeriod: "maandelijks" },
    { name: "Power Plus", price: 89.9, billingPeriod: "maandelijks" },
  ],
};
