import type { Preset } from "@/lib/presets/types";

export const applemusic: Preset = {
  id: "applemusic",
  name: "Apple Music",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=apple.com&sz=64",
  color: "#FA243C",
  affiliateUrl: "https://www.apple.com/nl/apple-music/",
  plans: [
    { name: "Student", price: 5.99, billingPeriod: "maandelijks" },
    { name: "Individueel", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Gezin", price: 16.99, billingPeriod: "maandelijks" },
  ],
};
