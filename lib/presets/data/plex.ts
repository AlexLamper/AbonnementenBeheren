import type { Preset } from "@/lib/presets/types";

export const plex: Preset = {
  id: "plex",
  name: "Plex",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=plex.tv&sz=64",
  color: "#E5A00D",
  affiliateUrl: "https://www.plex.tv/plans/",
  plans: [
    { name: "Remote Watch Pass", price: 2.99, billingPeriod: "maandelijks" },
    { name: "Remote Watch Pass (jaarlijks)", price: 29.99, billingPeriod: "jaarlijks" },
    { name: "Plex Pass", price: 5.99, billingPeriod: "maandelijks" },
    { name: "Plex Pass (jaarlijks)", price: 59.99, billingPeriod: "jaarlijks" },
  ],
};
