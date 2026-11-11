import type { Preset } from "@/lib/presets/types";

export const vijftigPlusMobiel: Preset = {
  id: "50plusmobiel",
  name: "50+ Mobiel",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=50plusmobiel.nl&sz=64",
  color: "#00539F",
  affiliateUrl: "https://www.50plusmobiel.nl/",
  plans: [
    { name: "10 GB", price: 7.5, billingPeriod: "maandelijks" },
    { name: "25 GB", price: 9.0, billingPeriod: "maandelijks" },
    { name: "45 GB", price: 10.0, billingPeriod: "maandelijks" },
    { name: "75 GB", price: 14.0, billingPeriod: "maandelijks" },
  ],
};
