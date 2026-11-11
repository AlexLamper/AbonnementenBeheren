import type { Preset } from "@/lib/presets/types";

export const simpel: Preset = {
  id: "simpel",
  name: "Simpel",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=simpel.nl&sz=64",
  color: "#2EB24A",
  affiliateUrl: "https://www.simpel.nl/",
  plans: [
    { name: "5 GB", price: 6.5, billingPeriod: "maandelijks" },
    { name: "5 GB + onbeperkt bellen", price: 8.0, billingPeriod: "maandelijks" },
  ],
};
