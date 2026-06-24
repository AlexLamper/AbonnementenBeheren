import type { Preset } from "@/lib/presets/types";

export const youtubemusic: Preset = {
  id: "youtubemusic",
  name: "YouTube Music",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=music.youtube.com&sz=64",
  color: "#FF0000",
  affiliateUrl: "https://music.youtube.com",
  plans: [
    { name: "Individueel", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Gezin", price: 16.99, billingPeriod: "maandelijks" },
  ],
};
