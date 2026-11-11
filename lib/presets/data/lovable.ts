import type { Preset } from "@/lib/presets/types";

export const lovable: Preset = {
  id: "lovable",
  name: "Lovable",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=lovable.dev&sz=64",
  color: "#F2545B",
  affiliateUrl: "https://lovable.dev/pricing",
  plans: [
    { name: "Pro", price: 27.05, billingPeriod: "maandelijks" },
    { name: "Pro (jaarlijks)", price: 270.55, billingPeriod: "jaarlijks" },
    { name: "Business", price: 54.11, billingPeriod: "maandelijks" },
  ],
};
