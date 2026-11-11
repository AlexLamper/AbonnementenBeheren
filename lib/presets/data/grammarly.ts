import type { Preset } from "@/lib/presets/types";

export const grammarly: Preset = {
  id: "grammarly",
  name: "Grammarly",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=grammarly.com&sz=64",
  color: "#15C39A",
  affiliateUrl: "https://www.grammarly.com/plans",
  plans: [
    { name: "Pro", price: 32.47, billingPeriod: "maandelijks" },
    { name: "Pro (kwartaal)", price: 64.93, billingPeriod: "kwartaal" },
    { name: "Pro (jaarlijks)", price: 155.84, billingPeriod: "jaarlijks" },
  ],
};
