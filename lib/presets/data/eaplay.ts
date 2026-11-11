import type { Preset } from "@/lib/presets/types";

export const eaplay: Preset = {
  id: "eaplay",
  name: "EA Play",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=ea.com&sz=64",
  color: "#FF4747",
  affiliateUrl: "https://www.ea.com/nl-nl/ea-play",
  plans: [
    { name: "EA Play", price: 5.99, billingPeriod: "maandelijks" },
    { name: "EA Play (jaarlijks)", price: 39.99, billingPeriod: "jaarlijks" },
    { name: "EA Play Pro", price: 16.99, billingPeriod: "maandelijks" },
    { name: "EA Play Pro (jaarlijks)", price: 119.99, billingPeriod: "jaarlijks" },
  ],
};
