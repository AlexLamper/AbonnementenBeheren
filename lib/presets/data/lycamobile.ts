import type { Preset } from "@/lib/presets/types";

export const lycamobile: Preset = {
  id: "lycamobile",
  name: "Lycamobile",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=lycamobile.nl&sz=64",
  color: "#0A3B8C",
  affiliateUrl: "https://www.lycamobile.nl/",
  plans: [
    { name: "10 GB", price: 9.0, billingPeriod: "maandelijks" },
    { name: "15 GB", price: 10.0, billingPeriod: "maandelijks" },
    { name: "20 GB", price: 14.0, billingPeriod: "maandelijks" },
    { name: "40 GB", price: 25.0, billingPeriod: "maandelijks" },
  ],
};
