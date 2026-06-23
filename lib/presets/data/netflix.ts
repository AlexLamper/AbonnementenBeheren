import type { Preset } from "@/lib/presets/types";

export const netflix: Preset = {
  id: "netflix",
  name: "Netflix",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=netflix.com&sz=64",
  color: "#E50914",
  plans: [
    { name: "Standaard met advertenties", price: 6.99, billingPeriod: "maandelijks" },
    { name: "Standaard", price: 13.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 19.99, billingPeriod: "maandelijks" },
  ],
};
