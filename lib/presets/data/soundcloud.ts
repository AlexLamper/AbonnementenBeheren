import type { Preset } from "@/lib/presets/types";

export const soundcloud: Preset = {
  id: "soundcloud",
  name: "SoundCloud",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=soundcloud.com&sz=64",
  color: "#FF5500",
  affiliateUrl: "https://soundcloud.com/go",
  plans: [
    { name: "Go", price: 5.99, billingPeriod: "maandelijks" },
    { name: "Go+", price: 9.99, billingPeriod: "maandelijks" },
  ],
};
