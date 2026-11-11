import type { Preset } from "@/lib/presets/types";

export const applearcade: Preset = {
  id: "applearcade",
  name: "Apple Arcade",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=apple.com&sz=64",
  color: "#FF2D55",
  affiliateUrl: "https://www.apple.com/nl/apple-arcade/",
  plans: [
    { name: "Apple Arcade", price: 6.99, billingPeriod: "maandelijks" },
  ],
};
