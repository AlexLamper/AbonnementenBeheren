import type { Preset } from "@/lib/presets/types";

export const canalplussatelliet: Preset = {
  id: "canalplussatelliet",
  name: "Canal+ Satelliet",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=canaldigitaal.nl&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.canaldigitaal.nl/",
  plans: [
    { name: "Riant", price: 25.95, billingPeriod: "maandelijks" },
    { name: "Rijk", price: 30.95, billingPeriod: "maandelijks" },
    { name: "Royaal", price: 40.95, billingPeriod: "maandelijks" },
  ],
};
