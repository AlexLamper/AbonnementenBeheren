import type { Preset } from "@/lib/presets/types";

export const ticktick: Preset = {
  id: "ticktick",
  name: "TickTick",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=ticktick.com&sz=64",
  color: "#4772FA",
  affiliateUrl: "https://ticktick.com/about/upgrade",
  plans: [
    { name: "Premium (maand)", price: 3.99, billingPeriod: "maandelijks" },
    { name: "Premium (jaar)", price: 35.99, billingPeriod: "jaarlijks" },
  ],
};
