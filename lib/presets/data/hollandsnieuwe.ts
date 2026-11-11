import type { Preset } from "@/lib/presets/types";

export const hollandsnieuwe: Preset = {
  id: "hollandsnieuwe",
  name: "hollandsnieuwe",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=hollandsnieuwe.nl&sz=64",
  color: "#FF5F00",
  affiliateUrl: "https://www.hollandsnieuwe.nl/",
  plans: [
    { name: "5 GB", price: 8.0, billingPeriod: "maandelijks" },
    { name: "10 GB", price: 9.0, billingPeriod: "maandelijks" },
    { name: "15 GB", price: 10.0, billingPeriod: "maandelijks" },
    { name: "20 GB", price: 12.0, billingPeriod: "maandelijks" },
  ],
};
