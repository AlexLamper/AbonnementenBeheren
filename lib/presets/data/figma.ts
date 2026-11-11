import type { Preset } from "@/lib/presets/types";

export const figma: Preset = {
  id: "figma",
  name: "Figma",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=figma.com&sz=64",
  color: "#F24E1E",
  affiliateUrl: "https://www.figma.com/pricing/",
  plans: [
    { name: "Professional Full seat (maand)", price: 24.2, billingPeriod: "maandelijks" },
    { name: "Professional Full seat (jaar)", price: 232.32, billingPeriod: "jaarlijks" },
    { name: "Professional Dev seat (maand)", price: 18.15, billingPeriod: "maandelijks" },
    { name: "Professional Collab seat (maand)", price: 6.05, billingPeriod: "maandelijks" },
  ],
};
