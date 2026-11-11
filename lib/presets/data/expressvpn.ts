import type { Preset } from "@/lib/presets/types";

export const expressvpn: Preset = {
  id: "expressvpn",
  name: "ExpressVPN",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=expressvpn.com&sz=64",
  color: "#DA3940",
  affiliateUrl: "https://www.expressvpn.com/pricing",
  plans: [
    { name: "Basic (maand)", price: 11.49, billingPeriod: "maandelijks" },
    { name: "Basic (jaar)", price: 79.95, billingPeriod: "jaarlijks" },
    { name: "Advanced (maand)", price: 12.49, billingPeriod: "maandelijks" },
    { name: "Advanced (jaar)", price: 109.95, billingPeriod: "jaarlijks" },
    { name: "Pro (jaar)", price: 179.95, billingPeriod: "jaarlijks" },
  ],
};
