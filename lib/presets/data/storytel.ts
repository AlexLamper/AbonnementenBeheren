import type { Preset } from "@/lib/presets/types";

export const storytel: Preset = {
  id: "storytel",
  name: "Storytel",
  category: "Boeken",
  logoUrl: "https://www.google.com/s2/favicons?domain=storytel.com&sz=64",
  color: "#E5004B",
  affiliateUrl: "https://www.storytel.com/nl",
  plans: [
    { name: "Unlimited", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 17.99, billingPeriod: "maandelijks" },
  ],
};
