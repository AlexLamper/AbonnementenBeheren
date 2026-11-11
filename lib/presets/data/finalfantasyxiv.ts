import type { Preset } from "@/lib/presets/types";

export const finalfantasyxiv: Preset = {
  id: "finalfantasyxiv",
  name: "Final Fantasy XIV",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=finalfantasyxiv.com&sz=64",
  color: "#1F4E9C",
  affiliateUrl: "https://eu.finalfantasyxiv.com/",
  plans: [
    { name: "Entry Course", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Standard Course", price: 12.99, billingPeriod: "maandelijks" },
  ],
};
