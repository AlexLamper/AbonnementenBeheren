import type { Preset } from "@/lib/presets/types";

export const anytimefitness: Preset = {
  id: "anytimefitness",
  name: "Anytime Fitness",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=anytimefitness.nl&sz=64",
  color: "#5F259F",
  affiliateUrl: "https://www.anytimefitness.nl/",
  plans: [
    { name: "Jaarlidmaatschap", price: 29.5, billingPeriod: "maandelijks" },
    { name: "Maandelijks opzegbaar", price: 37.5, billingPeriod: "maandelijks" },
  ],
};
