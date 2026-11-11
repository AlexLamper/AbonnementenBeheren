import type { Preset } from "@/lib/presets/types";

export const runway: Preset = {
  id: "runway",
  name: "Runway",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=runwayml.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://runwayml.com/pricing",
  plans: [
    { name: "Standard", price: 16.23, billingPeriod: "maandelijks" },
    { name: "Pro", price: 37.88, billingPeriod: "maandelijks" },
    { name: "Unlimited", price: 102.81, billingPeriod: "maandelijks" },
    { name: "Standard (jaarlijks)", price: 155.84, billingPeriod: "jaarlijks" },
  ],
};
