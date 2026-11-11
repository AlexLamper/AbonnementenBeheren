import type { Preset } from "@/lib/presets/types";

export const proton: Preset = {
  id: "proton",
  name: "Proton",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=proton.me&sz=64",
  color: "#6D4AFF",
  affiliateUrl: "https://proton.me/pricing",
  plans: [
    { name: "Mail Plus (jaar)", price: 47.88, billingPeriod: "jaarlijks" },
    { name: "VPN Plus (jaar)", price: 59.88, billingPeriod: "jaarlijks" },
    { name: "Pass Plus (jaar)", price: 23.88, billingPeriod: "jaarlijks" },
    { name: "Unlimited (maand)", price: 12.99, billingPeriod: "maandelijks" },
    { name: "Unlimited (jaar)", price: 119.88, billingPeriod: "jaarlijks" },
  ],
};
