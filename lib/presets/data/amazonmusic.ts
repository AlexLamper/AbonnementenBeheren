import type { Preset } from "@/lib/presets/types";

export const amazonmusic: Preset = {
  id: "amazonmusic",
  name: "Amazon Music Unlimited",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=music.amazon.com&sz=64",
  color: "#25D1DA",
  affiliateUrl: "https://www.amazon.nl/music/unlimited",
  plans: [
    { name: "Individueel", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Individueel (Prime-leden)", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Family", price: 16.99, billingPeriod: "maandelijks" },
  ],
};
