import type { Preset } from "@/lib/presets/types";

export const videoland: Preset = {
  id: "videoland",
  name: "Videoland",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=videoland.com&sz=64",
  color: "#E6007E",
  affiliateUrl: "https://www.videoland.com/abonnementen",
  plans: [
    { name: "Basis", price: 6.99, billingPeriod: "maandelijks" },
    { name: "Plus", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 14.99, billingPeriod: "maandelijks" },
  ],
};
