import type { Preset } from "@/lib/presets/types";

export const fd: Preset = {
  id: "fd",
  name: "Het Financieele Dagblad (FD)",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=fd.nl&sz=64",
  color: "#003366",
  affiliateUrl: "https://fd.nl/abonneren",
  plans: [{ name: "Digitaal", price: 36.0, billingPeriod: "maandelijks" }],
};
