import type { Preset } from "@/lib/presets/types";

export const bitwarden: Preset = {
  id: "bitwarden",
  name: "Bitwarden",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=bitwarden.com&sz=64",
  color: "#175DDC",
  affiliateUrl: "https://bitwarden.com/pricing/",
  plans: [
    { name: "Premium (jaar)", price: 21.56, billingPeriod: "jaarlijks" },
    { name: "Families (jaar)", price: 52.14, billingPeriod: "jaarlijks" },
  ],
};
