import type { Preset } from "@/lib/presets/types";

export const hellofresh: Preset = {
  id: "hellofresh",
  name: "HelloFresh",
  category: "Eten & Bezorging",
  logoUrl: "https://www.google.com/s2/favicons?domain=hellofresh.nl&sz=64",
  color: "#91C11E",
  affiliateUrl: "https://www.hellofresh.nl/plans",
  plans: [
    { name: "3 maaltijden voor 2 personen", price: 54.99, billingPeriod: "wekelijks" },
    { name: "4 maaltijden voor 2 personen", price: 66.99, billingPeriod: "wekelijks" },
    { name: "3 maaltijden voor 4 personen", price: 84.99, billingPeriod: "wekelijks" },
  ],
};
