import type { Preset } from "@/lib/presets/types";

export const yellowbrick: Preset = {
  id: "yellowbrick",
  name: "Yellowbrick",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=yellowbrick.nl&sz=64",
  color: "#FFD100",
  affiliateUrl: "https://www.yellowbrick.nl/",
  plans: [
    { name: "Unlimited", price: 3.99, billingPeriod: "maandelijks" },
  ],
};
