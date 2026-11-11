import type { Preset } from "@/lib/presets/types";

export const gemini: Preset = {
  id: "gemini",
  name: "Google Gemini",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64",
  color: "#1A73E8",
  affiliateUrl: "https://gemini.google/nl/subscriptions/",
  plans: [
    { name: "Google AI Plus", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Google AI Pro", price: 21.99, billingPeriod: "maandelijks" },
    { name: "Google AI Ultra (5x)", price: 99.99, billingPeriod: "maandelijks" },
    { name: "Google AI Ultra (20x)", price: 219.99, billingPeriod: "maandelijks" },
  ],
};
