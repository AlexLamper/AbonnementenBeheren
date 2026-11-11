import type { Preset } from "@/lib/presets/types";

export const simyo: Preset = {
  id: "simyo",
  name: "Simyo",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=simyo.nl&sz=64",
  color: "#FF6A00",
  affiliateUrl: "https://www.simyo.nl/mobiel-abonnement",
  plans: [
    { name: "20 GB", price: 11.0, billingPeriod: "maandelijks" },
    { name: "30 GB", price: 13.0, billingPeriod: "maandelijks" },
    { name: "40 GB", price: 15.0, billingPeriod: "maandelijks" },
  ],
};
