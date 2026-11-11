import type { Preset } from "@/lib/presets/types";

export const telegraaf: Preset = {
  id: "telegraaf",
  name: "De Telegraaf",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=telegraaf.nl&sz=64",
  color: "#C8102E",
  affiliateUrl: "https://www.telegraaf.nl/",
  plans: [{ name: "Digitaal", price: 16.99, billingPeriod: "maandelijks" }],
};
