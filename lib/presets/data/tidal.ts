import type { Preset } from "@/lib/presets/types";

export const tidal: Preset = {
  id: "tidal",
  name: "Tidal",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=tidal.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://tidal.com/nl",
  plans: [
    { name: "Individueel", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Gezin", price: 16.99, billingPeriod: "maandelijks" },
  ],
};
