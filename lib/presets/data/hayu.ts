import type { Preset } from "@/lib/presets/types";

export const hayu: Preset = {
  id: "hayu",
  name: "Hayu",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=hayu.com&sz=64",
  color: "#E6007E",
  affiliateUrl: "https://www.hayu.com/",
  plans: [{ name: "Hayu", price: 5.99, billingPeriod: "maandelijks" }],
};
