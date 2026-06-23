import type { Preset } from "@/lib/presets/types";

export const max: Preset = {
  id: "max",
  name: "HBO Max",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=max.com&sz=64",
  color: "#0046FF",
  plans: [
    { name: "Basic met advertenties", price: 5.99, billingPeriod: "maandelijks" },
    { name: "Standaard", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 16.99, billingPeriod: "maandelijks" },
  ],
};
