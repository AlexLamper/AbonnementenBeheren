import type { Preset } from "@/lib/presets/types";

export const applefitnessplus: Preset = {
  id: "applefitnessplus",
  name: "Apple Fitness+",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=apple.com&sz=64",
  color: "#A4E400",
  affiliateUrl: "https://www.apple.com/nl/apple-fitness-plus/",
  plans: [
    { name: "Fitness+", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Fitness+ (jaarlijks)", price: 79.99, billingPeriod: "jaarlijks" },
  ],
};
