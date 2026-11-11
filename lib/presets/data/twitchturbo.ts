import type { Preset } from "@/lib/presets/types";

export const twitchturbo: Preset = {
  id: "twitchturbo",
  name: "Twitch Turbo",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=twitch.tv&sz=64",
  color: "#9146FF",
  affiliateUrl: "https://www.twitch.tv/turbo",
  plans: [
    { name: "Turbo", price: 11.99, billingPeriod: "maandelijks" },
  ],
};
