import type { Preset } from "@/lib/presets/types";

export const freedom: Preset = {
  id: "freedom",
  name: "Freedom Internet",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=freedom.nl&sz=64",
  color: "#E3342F",
  affiliateUrl: "https://freedom.nl/",
  plans: [
    { name: "Glasvezel 100 Mbit/s", price: 50.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 500 Mbit/s", price: 58.0, billingPeriod: "maandelijks" },
    { name: "Internet 50 Mbit/s + TV", price: 61.0, billingPeriod: "maandelijks" },
  ],
};
