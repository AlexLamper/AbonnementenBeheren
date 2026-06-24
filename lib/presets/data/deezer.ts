import type { Preset } from "@/lib/presets/types";

export const deezer: Preset = {
  id: "deezer",
  name: "Deezer",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=deezer.com&sz=64",
  color: "#A238FF",
  affiliateUrl: "https://www.deezer.com/nl/offers",
  plans: [
    { name: "Individueel", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Gezin", price: 19.99, billingPeriod: "maandelijks" },
  ],
};
