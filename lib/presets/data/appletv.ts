import type { Preset } from "@/lib/presets/types";

export const appletv: Preset = {
  id: "appletv",
  name: "Apple TV+",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=apple.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://tv.apple.com",
  plans: [{ name: "Standaard", price: 9.99, billingPeriod: "maandelijks" }],
};
