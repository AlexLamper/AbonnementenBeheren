import type { Preset } from "@/lib/presets/types";

export const surfshark: Preset = {
  id: "surfshark",
  name: "Surfshark",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=surfshark.com&sz=64",
  color: "#178A9E",
  affiliateUrl: "https://surfshark.com/nl/pricing",
  plans: [
    { name: "Starter (maand)", price: 18.95, billingPeriod: "maandelijks" },
    { name: "One (maand)", price: 19.95, billingPeriod: "maandelijks" },
    { name: "One+ (maand)", price: 22.85, billingPeriod: "maandelijks" },
    { name: "Starter (jaar)", price: 79.0, billingPeriod: "jaarlijks" },
    { name: "One (jaar)", price: 99.0, billingPeriod: "jaarlijks" },
  ],
};
