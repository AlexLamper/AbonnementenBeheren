import type { Preset } from "@/lib/presets/types";

export const parool: Preset = {
  id: "parool",
  name: "Het Parool",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=parool.nl&sz=64",
  color: "#D40000",
  affiliateUrl: "https://www.parool.nl/",
  plans: [{ name: "Digitaal", price: 19.5, billingPeriod: "maandelijks" }],
};
