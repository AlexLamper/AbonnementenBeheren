import type { Preset } from "@/lib/presets/types";

export const sportcity: Preset = {
  id: "sportcity",
  name: "SportCity",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=sportcity.nl&sz=64",
  color: "#F15A22",
  affiliateUrl: "https://www.sportcity.nl/lidmaatschap",
  plans: [
    { name: "City One", price: 29.99, billingPeriod: "maandelijks" },
    { name: "City Plus", price: 30.99, billingPeriod: "maandelijks" },
    { name: "Studenten & Scholieren", price: 29.99, billingPeriod: "maandelijks" },
  ],
};
