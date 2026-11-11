import type { Preset } from "@/lib/presets/types";

export const anwb: Preset = {
  id: "anwb",
  name: "ANWB Wegenwacht",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=anwb.nl&sz=64",
  color: "#FFCC00",
  affiliateUrl: "https://www.anwb.nl/wegenwacht",
  plans: [
    { name: "Nederland Instap", price: 6.5, billingPeriod: "maandelijks" },
    { name: "Nederland Standaard", price: 10.7, billingPeriod: "maandelijks" },
    { name: "Nederland Compleet", price: 13.34, billingPeriod: "maandelijks" },
    { name: "Europa Standaard", price: 16.17, billingPeriod: "maandelijks" },
    { name: "Europa Compleet", price: 21.32, billingPeriod: "maandelijks" },
  ],
};
