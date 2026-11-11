import type { Preset } from "@/lib/presets/types";

export const onlinenl: Preset = {
  id: "onlinenl",
  name: "Online.nl",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=online.nl&sz=64",
  color: "#F7A600",
  affiliateUrl: "https://www.online.nl/",
  plans: [
    { name: "DSL 50 Mbit/s", price: 36.5, billingPeriod: "maandelijks" },
    { name: "Glasvezel 100 Mbit/s", price: 49.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 500 Mbit/s", price: 61.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 100 Mbit/s + TV", price: 58.5, billingPeriod: "maandelijks" },
  ],
};
