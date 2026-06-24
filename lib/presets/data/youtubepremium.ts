import type { Preset } from "@/lib/presets/types";

export const youtubepremium: Preset = {
  id: "youtubepremium",
  name: "YouTube Premium",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
  color: "#FF0000",
  affiliateUrl: "https://www.youtube.com/premium",
  plans: [
    { name: "Student", price: 7.99, billingPeriod: "maandelijks" },
    { name: "Individueel", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Gezin", price: 23.99, billingPeriod: "maandelijks" },
  ],
};
