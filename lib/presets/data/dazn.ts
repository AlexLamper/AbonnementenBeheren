import type { Preset } from "@/lib/presets/types";

export const dazn: Preset = {
  id: "dazn",
  name: "DAZN",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=dazn.com&sz=64",
  color: "#F8FC00",
  affiliateUrl: "https://www.dazn.com/",
  plans: [
    { name: "NFL Game Pass Season Pro", price: 149.99, billingPeriod: "jaarlijks" },
    { name: "NFL Game Pass Season Pro Ultimate", price: 169.99, billingPeriod: "jaarlijks" },
  ],
};
