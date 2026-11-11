import type { Preset } from "@/lib/presets/types";

export const youfonethuis: Preset = {
  id: "youfonethuis",
  name: "Youfone Internet",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=youfone.nl&sz=64",
  color: "#00A3E0",
  affiliateUrl: "https://www.youfone.nl/",
  plans: [
    { name: "Internet 100 Mbit/s", price: 32.5, billingPeriod: "maandelijks" },
    { name: "Glasvezel 100 Mbit/s", price: 39.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 200 Mbit/s", price: 42.5, billingPeriod: "maandelijks" },
    { name: "Internet 100 Mbit/s + TV", price: 42.0, billingPeriod: "maandelijks" },
  ],
};
