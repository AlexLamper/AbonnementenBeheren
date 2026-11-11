import type { Preset } from "@/lib/presets/types";

export const cinetree: Preset = {
  id: "cinetree",
  name: "Cinetree",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=cinetree.nl&sz=64",
  color: "#1F4D3A",
  affiliateUrl: "https://www.cinetree.nl/",
  plans: [
    { name: "Maandabonnement", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Jaarabonnement", price: 84.0, billingPeriod: "jaarlijks" },
  ],
};
