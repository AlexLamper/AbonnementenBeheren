import type { Preset } from "@/lib/presets/types";

export const youfone: Preset = {
  id: "youfone",
  name: "Youfone",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=youfone.nl&sz=64",
  color: "#00A3E0",
  affiliateUrl: "https://www.youfone.nl/",
  plans: [
    { name: "10 GB", price: 7.5, billingPeriod: "maandelijks" },
    { name: "20 GB", price: 10.0, billingPeriod: "maandelijks" },
    { name: "40 GB", price: 12.0, billingPeriod: "maandelijks" },
  ],
};
