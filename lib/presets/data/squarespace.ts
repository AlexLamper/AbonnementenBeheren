import type { Preset } from "@/lib/presets/types";

export const squarespace: Preset = {
  id: "squarespace",
  name: "Squarespace",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=squarespace.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.squarespace.com/pricing",
  plans: [
    { name: "Basic (jaar)", price: 144.0, billingPeriod: "jaarlijks" },
    { name: "Core (jaar)", price: 216.0, billingPeriod: "jaarlijks" },
    { name: "Plus (jaar)", price: 384.0, billingPeriod: "jaarlijks" },
  ],
};
