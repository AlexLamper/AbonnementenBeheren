import type { Preset } from "@/lib/presets/types";

export const zoom: Preset = {
  id: "zoom",
  name: "Zoom",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=zoom.com&sz=64",
  color: "#0B5CFF",
  affiliateUrl: "https://www.zoom.com/pricing",
  plans: [
    { name: "Workplace Pro (maand)", price: 19.35, billingPeriod: "maandelijks" },
    { name: "Workplace Pro (jaar)", price: 193.48, billingPeriod: "jaarlijks" },
  ],
};
