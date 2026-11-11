import type { Preset } from "@/lib/presets/types";

export const nebula: Preset = {
  id: "nebula",
  name: "Nebula",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=nebula.tv&sz=64",
  color: "#3F7CF6",
  affiliateUrl: "https://nebula.tv/",
  plans: [
    { name: "Nebula", price: 6.0, billingPeriod: "maandelijks" },
    { name: "Nebula (jaarlijks)", price: 60.0, billingPeriod: "jaarlijks" },
  ],
};
