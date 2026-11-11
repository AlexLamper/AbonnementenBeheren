import type { Preset } from "@/lib/presets/types";

export const koboplus: Preset = {
  id: "koboplus",
  name: "Kobo Plus",
  category: "Boeken",
  logoUrl: "https://www.google.com/s2/favicons?domain=kobo.com&sz=64",
  color: "#BF0000",
  affiliateUrl: "https://www.bol.com/nl/nl/kobo-plus/",
  plans: [
    { name: "Lezen", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Luisteren", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Lezen & Luisteren", price: 14.99, billingPeriod: "maandelijks" },
  ],
};
