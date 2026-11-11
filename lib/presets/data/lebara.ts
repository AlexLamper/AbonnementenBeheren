import type { Preset } from "@/lib/presets/types";

export const lebara: Preset = {
  id: "lebara",
  name: "Lebara",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=lebara.nl&sz=64",
  color: "#0071BC",
  affiliateUrl: "https://www.lebara.nl/",
  plans: [
    { name: "1 GB", price: 4.0, billingPeriod: "maandelijks" },
    { name: "5 GB", price: 7.0, billingPeriod: "maandelijks" },
    { name: "10 GB", price: 8.0, billingPeriod: "maandelijks" },
    { name: "40 GB", price: 11.0, billingPeriod: "maandelijks" },
  ],
};
