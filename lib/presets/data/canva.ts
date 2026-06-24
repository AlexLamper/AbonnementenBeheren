import type { Preset } from "@/lib/presets/types";

export const canva: Preset = {
  id: "canva",
  name: "Canva",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=canva.com&sz=64",
  color: "#00C4CC",
  affiliateUrl: "https://www.canva.com/nl_nl/pro/",
  plans: [
    { name: "Pro (maand)", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Pro (jaar)", price: 109.99, billingPeriod: "jaarlijks" },
  ],
};
