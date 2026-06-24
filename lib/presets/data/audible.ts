import type { Preset } from "@/lib/presets/types";

export const audible: Preset = {
  id: "audible",
  name: "Audible",
  category: "Boeken",
  logoUrl: "https://www.google.com/s2/favicons?domain=audible.nl&sz=64",
  color: "#FF9900",
  affiliateUrl: "https://www.audible.nl",
  plans: [{ name: "Abonnement", price: 9.95, billingPeriod: "maandelijks" }],
};
