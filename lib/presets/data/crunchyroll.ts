import type { Preset } from "@/lib/presets/types";

export const crunchyroll: Preset = {
  id: "crunchyroll",
  name: "Crunchyroll",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=crunchyroll.com&sz=64",
  color: "#F47521",
  affiliateUrl: "https://www.crunchyroll.com/premium",
  plans: [
    { name: "Fan", price: 6.99, billingPeriod: "maandelijks" },
    { name: "Mega Fan", price: 9.99, billingPeriod: "maandelijks" },
  ],
};
