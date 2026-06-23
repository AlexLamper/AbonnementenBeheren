import type { Preset } from "@/lib/presets/types";

export const ziggo: Preset = {
  id: "ziggo",
  name: "Ziggo",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=ziggo.nl&sz=64",
  color: "#F36F21",
  plans: [
    { name: "Internet", price: 49.0, billingPeriod: "maandelijks" },
    { name: "Internet & TV", price: 62.0, billingPeriod: "maandelijks" },
  ],
};
