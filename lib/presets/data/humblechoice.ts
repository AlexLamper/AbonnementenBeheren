import type { Preset } from "@/lib/presets/types";

export const humblechoice: Preset = {
  id: "humblechoice",
  name: "Humble Choice",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=humblebundle.com&sz=64",
  color: "#CB272C",
  affiliateUrl: "https://www.humblebundle.com/membership",
  plans: [
    { name: "Humble Choice", price: 12.99, billingPeriod: "maandelijks" },
  ],
};
