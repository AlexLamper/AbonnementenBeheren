import type { Preset } from "@/lib/presets/types";

export const ekomenu: Preset = {
  id: "ekomenu",
  name: "Ekomenu",
  category: "Eten & Bezorging",
  logoUrl: "https://www.google.com/s2/favicons?domain=ekomenu.nl&sz=64",
  color: "#6BA539",
  affiliateUrl: "https://www.ekomenu.nl/",
  plans: [
    { name: "3 maaltijden voor 2 personen", price: 59.95, billingPeriod: "wekelijks" },
    { name: "4 maaltijden voor 2 personen", price: 74.95, billingPeriod: "wekelijks" },
    { name: "3 maaltijden voor 4 personen", price: 99.95, billingPeriod: "wekelijks" },
  ],
};
