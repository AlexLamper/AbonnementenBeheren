import type { Preset } from "@/lib/presets/types";

export const simpel: Preset = {
  id: "simpel",
  name: "Simpel",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=simpel.nl&sz=64",
  color: "#2EB24A",
  affiliateUrl: "https://www.simpel.nl/",
  plans: [
    { name: "10 GB", price: 7.5, billingPeriod: "maandelijks" },
    { name: "18 GB", price: 9.0, billingPeriod: "maandelijks" },
    { name: "30 GB", price: 10.0, billingPeriod: "maandelijks" },
    { name: "10 GB + onbeperkt bellen", price: 9.0, billingPeriod: "maandelijks" },
  ],
};
