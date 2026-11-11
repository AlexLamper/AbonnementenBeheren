import type { Preset } from "@/lib/presets/types";

export const headspace: Preset = {
  id: "headspace",
  name: "Headspace",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=headspace.com&sz=64",
  color: "#FF7E1D",
  affiliateUrl: "https://www.headspace.com/",
  plans: [
    { name: "Maandelijks", price: 12.99, billingPeriod: "maandelijks" },
    { name: "Jaarlijks", price: 69.99, billingPeriod: "jaarlijks" },
  ],
};
