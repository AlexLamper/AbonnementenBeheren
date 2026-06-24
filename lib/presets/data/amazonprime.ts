import type { Preset } from "@/lib/presets/types";

// Prijzen indicatief (NL) en kunnen wijzigen.
export const amazonprime: Preset = {
  id: "amazonprime",
  name: "Amazon Prime",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=primevideo.com&sz=64",
  color: "#00A8E1",
  affiliateUrl: "https://www.amazon.nl/amazonprime",
  plans: [
    { name: "Maand", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Jaar", price: 49.9, billingPeriod: "jaarlijks" },
  ],
};
