import type { Preset } from "@/lib/presets/types";

export const decorrespondent: Preset = {
  id: "decorrespondent",
  name: "De Correspondent",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=decorrespondent.nl&sz=64",
  color: "#E8452C",
  affiliateUrl: "https://decorrespondent.nl/",
  plans: [
    { name: "Lidmaatschap", price: 9.0, billingPeriod: "maandelijks" },
    { name: "Lidmaatschap (jaarlijks)", price: 90.0, billingPeriod: "jaarlijks" },
  ],
};
