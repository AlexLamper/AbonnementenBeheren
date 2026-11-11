import type { Preset } from "@/lib/presets/types";

export const mistral: Preset = {
  id: "mistral",
  name: "Mistral Le Chat",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=mistral.ai&sz=64",
  color: "#FA520F",
  affiliateUrl: "https://mistral.ai/pricing",
  plans: [
    { name: "Pro", price: 18.14, billingPeriod: "maandelijks" },
    { name: "Student", price: 7.25, billingPeriod: "maandelijks" },
  ],
};
