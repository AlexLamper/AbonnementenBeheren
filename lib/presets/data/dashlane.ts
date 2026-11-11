import type { Preset } from "@/lib/presets/types";

export const dashlane: Preset = {
  id: "dashlane",
  name: "Dashlane",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=dashlane.com&sz=64",
  color: "#0E353D",
  affiliateUrl: "https://www.dashlane.com/pricing",
  plans: [
    { name: "Premium (jaar)", price: 59.88, billingPeriod: "jaarlijks" },
    { name: "Friends & Family (jaar)", price: 89.88, billingPeriod: "jaarlijks" },
  ],
};
