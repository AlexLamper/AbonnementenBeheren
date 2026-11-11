import type { Preset } from "@/lib/presets/types";

export const ew: Preset = {
  id: "ew",
  name: "EW (Elsevier Weekblad)",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=ewmagazine.nl&sz=64",
  color: "#E2001A",
  affiliateUrl: "https://www.ewmagazine.nl/",
  plans: [{ name: "Digitaal", price: 15.95, billingPeriod: "maandelijks" }],
};
