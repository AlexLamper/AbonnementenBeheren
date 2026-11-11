import type { Preset } from "@/lib/presets/types";

export const marleyspoon: Preset = {
  id: "marleyspoon",
  name: "Marley Spoon",
  category: "Eten & Bezorging",
  logoUrl: "https://www.google.com/s2/favicons?domain=marleyspoon.nl&sz=64",
  color: "#00A88E",
  affiliateUrl: "https://marleyspoon.nl/",
  plans: [
    { name: "3 maaltijden voor 2 personen", price: 59.99, billingPeriod: "wekelijks" },
    { name: "4 maaltijden voor 2 personen", price: 71.99, billingPeriod: "wekelijks" },
    { name: "3 maaltijden voor 4 personen", price: 89.99, billingPeriod: "wekelijks" },
  ],
};
