import type { Preset } from "@/lib/presets/types";

export const playstationplus: Preset = {
  id: "playstationplus",
  name: "PlayStation Plus",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=playstation.com&sz=64",
  color: "#003791",
  affiliateUrl: "https://www.playstation.com/nl-nl/ps-plus/",
  plans: [
    { name: "Essential", price: 8.99, billingPeriod: "maandelijks" },
    { name: "Extra", price: 13.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 16.99, billingPeriod: "maandelijks" },
  ],
};
