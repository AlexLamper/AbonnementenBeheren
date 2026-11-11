import type { Preset } from "@/lib/presets/types";

export const ahpremium: Preset = {
  id: "ahpremium",
  name: "Albert Heijn Premium",
  category: "Eten & Bezorging",
  logoUrl: "https://www.google.com/s2/favicons?domain=ah.nl&sz=64",
  color: "#00A0E2",
  affiliateUrl: "https://www.ah.nl/premium",
  plans: [
    { name: "Premium (jaarlijks)", price: 12.99, billingPeriod: "jaarlijks" },
  ],
};
