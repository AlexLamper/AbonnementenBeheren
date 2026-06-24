import type { Preset } from "@/lib/presets/types";

export const strava: Preset = {
  id: "strava",
  name: "Strava",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=strava.com&sz=64",
  color: "#FC4C02",
  affiliateUrl: "https://www.strava.com/subscribe",
  plans: [
    { name: "Maand", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Jaar", price: 79.99, billingPeriod: "jaarlijks" },
  ],
};
