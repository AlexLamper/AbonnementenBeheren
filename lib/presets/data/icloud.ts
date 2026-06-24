import type { Preset } from "@/lib/presets/types";

export const icloud: Preset = {
  id: "icloud",
  name: "iCloud+",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=icloud.com&sz=64",
  color: "#3693F3",
  affiliateUrl: "https://www.apple.com/nl/icloud/",
  plans: [
    { name: "50GB", price: 0.99, billingPeriod: "maandelijks" },
    { name: "200GB", price: 2.99, billingPeriod: "maandelijks" },
    { name: "2TB", price: 9.99, billingPeriod: "maandelijks" },
  ],
};
