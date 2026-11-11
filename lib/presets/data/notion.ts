import type { Preset } from "@/lib/presets/types";

export const notion: Preset = {
  id: "notion",
  name: "Notion",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=notion.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.notion.com/nl/pricing",
  plans: [
    { name: "Plus (maand)", price: 13.07, billingPeriod: "maandelijks" },
    { name: "Plus (jaar)", price: 130.68, billingPeriod: "jaarlijks" },
  ],
};
