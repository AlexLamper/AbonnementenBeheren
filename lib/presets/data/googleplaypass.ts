import type { Preset } from "@/lib/presets/types";

export const googleplaypass: Preset = {
  id: "googleplaypass",
  name: "Google Play Pass",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=play.google.com&sz=64",
  color: "#01875F",
  affiliateUrl: "https://play.google.com/about/play-pass/",
  plans: [
    { name: "Play Pass", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Play Pass (jaarlijks)", price: 29.99, billingPeriod: "jaarlijks" },
  ],
};
