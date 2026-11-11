import type { Preset } from "@/lib/presets/types";

export const dropout: Preset = {
  id: "dropout",
  name: "Dropout",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=dropout.tv&sz=64",
  color: "#FFD400",
  affiliateUrl: "https://www.dropout.tv/",
  plans: [
    { name: "Dropout", price: 6.99, billingPeriod: "maandelijks" },
    { name: "Dropout (jaarlijks)", price: 69.99, billingPeriod: "jaarlijks" },
  ],
};
