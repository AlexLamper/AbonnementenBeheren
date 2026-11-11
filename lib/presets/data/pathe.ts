import type { Preset } from "@/lib/presets/types";

export const pathe: Preset = {
  id: "pathe",
  name: "Pathé Unlimited",
  category: "Uitjes & Cultuur",
  logoUrl: "https://www.google.com/s2/favicons?domain=pathe.nl&sz=64",
  color: "#FFC426",
  affiliateUrl: "https://www.pathe.nl/",
  plans: [
    { name: "Unlimited", price: 26.5, billingPeriod: "maandelijks" },
  ],
};
