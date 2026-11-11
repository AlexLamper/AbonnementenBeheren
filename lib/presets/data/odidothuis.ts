import type { Preset } from "@/lib/presets/types";

export const odidothuis: Preset = {
  id: "odidothuis",
  name: "Odido Thuis",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=odido.nl&sz=64",
  color: "#E5007D",
  affiliateUrl: "https://www.odido.nl/thuis",
  plans: [
    { name: "Glasvezel 100 Mbit/s", price: 36.5, billingPeriod: "maandelijks" },
    { name: "Glasvezel 400 Mbit/s", price: 42.5, billingPeriod: "maandelijks" },
    { name: "Glasvezel 1 Gbit/s", price: 45.0, billingPeriod: "maandelijks" },
    { name: "Glasvezel 1 Gbit/s + TV", price: 57.5, billingPeriod: "maandelijks" },
  ],
};
