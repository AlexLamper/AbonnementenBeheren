import type { Preset } from "@/lib/presets/types";

export const disneyplus: Preset = {
  id: "disneyplus",
  name: "Disney+",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=disneyplus.com&sz=64",
  color: "#113CCF",
  affiliateUrl: "https://www.disneyplus.com/nl-nl",
  plans: [
    { name: "Standaard met advertenties", price: 6.99, billingPeriod: "maandelijks" },
    { name: "Standaard", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 15.99, billingPeriod: "maandelijks" },
  ],
};
