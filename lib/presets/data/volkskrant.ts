import type { Preset } from "@/lib/presets/types";

export const volkskrant: Preset = {
  id: "volkskrant",
  name: "de Volkskrant",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=volkskrant.nl&sz=64",
  color: "#1F1F1F",
  affiliateUrl: "https://www.volkskrant.nl/",
  plans: [{ name: "Digitaal", price: 22.5, billingPeriod: "maandelijks" }],
};
