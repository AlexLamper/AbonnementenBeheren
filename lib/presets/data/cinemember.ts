import type { Preset } from "@/lib/presets/types";

export const cinemember: Preset = {
  id: "cinemember",
  name: "CineMember",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=cinemember.nl&sz=64",
  color: "#E3262F",
  affiliateUrl: "https://www.cinemember.nl/",
  plans: [
    { name: "Maandabonnement", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Jaarabonnement", price: 95.0, billingPeriod: "jaarlijks" },
  ],
};
