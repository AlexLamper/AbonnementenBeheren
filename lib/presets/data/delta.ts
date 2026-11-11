import type { Preset } from "@/lib/presets/types";

export const delta: Preset = {
  id: "delta",
  name: "DELTA",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=delta.nl&sz=64",
  color: "#1D2C5E",
  affiliateUrl: "https://www.delta.nl/",
  plans: [
    { name: "Glasvezel 500 Mbit/s", price: 42.5, billingPeriod: "maandelijks" },
    { name: "Glasvezel 1 Gbit/s", price: 52.5, billingPeriod: "maandelijks" },
    { name: "Glasvezel 5 Gbit/s", price: 67.5, billingPeriod: "maandelijks" },
    { name: "Glasvezel 1 Gbit/s + TV", price: 67.5, billingPeriod: "maandelijks" },
  ],
};
