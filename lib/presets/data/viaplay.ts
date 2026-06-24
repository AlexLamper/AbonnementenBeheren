import type { Preset } from "@/lib/presets/types";

export const viaplay: Preset = {
  id: "viaplay",
  name: "Viaplay",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=viaplay.nl&sz=64",
  color: "#E50019",
  affiliateUrl: "https://viaplay.nl",
  plans: [
    { name: "Film & Series", price: 13.99, billingPeriod: "maandelijks" },
    { name: "Totaal", price: 15.99, billingPeriod: "maandelijks" },
  ],
};
