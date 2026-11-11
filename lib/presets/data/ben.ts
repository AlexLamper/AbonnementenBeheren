import type { Preset } from "@/lib/presets/types";

export const ben: Preset = {
  id: "ben",
  name: "Ben",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=ben.nl&sz=64",
  color: "#009FE3",
  affiliateUrl: "https://www.ben.nl/",
  plans: [
    { name: "15 GB", price: 9.0, billingPeriod: "maandelijks" },
    { name: "25 GB", price: 9.5, billingPeriod: "maandelijks" },
    { name: "35 GB", price: 10.0, billingPeriod: "maandelijks" },
    { name: "40 GB", price: 11.0, billingPeriod: "maandelijks" },
  ],
};
