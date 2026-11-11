import type { Preset } from "@/lib/presets/types";

export const solcon: Preset = {
  id: "solcon",
  name: "Solcon",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=solcon.nl&sz=64",
  color: "#F39200",
  affiliateUrl: "https://www.solcon.nl/",
  plans: [
    { name: "Glasvezel 500 Mbit/s", price: 54.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 1 Gbit/s", price: 57.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 2 Gbit/s", price: 65.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 1 Gbit/s + TV", price: 69.5, billingPeriod: "maandelijks" },
  ],
};
