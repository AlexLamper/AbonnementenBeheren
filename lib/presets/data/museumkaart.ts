import type { Preset } from "@/lib/presets/types";

export const museumkaart: Preset = {
  id: "museumkaart",
  name: "Museumkaart",
  category: "Uitjes & Cultuur",
  logoUrl: "https://www.google.com/s2/favicons?domain=museumkaart.nl&sz=64",
  color: "#E4003B",
  affiliateUrl: "https://www.museumkaart.nl/",
  plans: [
    { name: "Volwassenen", price: 75.0, billingPeriod: "jaarlijks" },
    { name: "Jongeren t/m 18 jaar", price: 37.5, billingPeriod: "jaarlijks" },
  ],
};
