import type { Preset } from "@/lib/presets/types";

export const skyshowtime: Preset = {
  id: "skyshowtime",
  name: "SkyShowtime",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=skyshowtime.com&sz=64",
  color: "#1F1646",
  affiliateUrl: "https://www.skyshowtime.com/nl",
  plans: [
    { name: "Standaard met advertenties", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Standaard", price: 6.99, billingPeriod: "maandelijks" },
  ],
};
