import type { Preset } from "@/lib/presets/types";

export const wix: Preset = {
  id: "wix",
  name: "Wix",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=wix.com&sz=64",
  color: "#116DFF",
  affiliateUrl: "https://nl.wix.com/upgrade/website",
  plans: [
    { name: "Light (jaar)", price: 203.28, billingPeriod: "jaarlijks" },
    { name: "Core (jaar)", price: 363.0, billingPeriod: "jaarlijks" },
    { name: "Business (jaar)", price: 493.68, billingPeriod: "jaarlijks" },
  ],
};
