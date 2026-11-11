import type { Preset } from "@/lib/presets/types";

export const komoot: Preset = {
  id: "komoot",
  name: "Komoot",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=komoot.com&sz=64",
  color: "#6AA127",
  affiliateUrl: "https://www.komoot.com/nl-nl/premium",
  plans: [
    { name: "Premium (jaarlijks)", price: 59.99, billingPeriod: "jaarlijks" },
  ],
};
