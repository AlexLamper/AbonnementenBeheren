import type { Preset } from "@/lib/presets/types";

export const deepl: Preset = {
  id: "deepl",
  name: "DeepL Pro",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=deepl.com&sz=64",
  color: "#0F2B46",
  affiliateUrl: "https://www.deepl.com/nl/pro",
  plans: [
    { name: "Individual", price: 8.99, billingPeriod: "maandelijks" },
    { name: "Individual (jaarlijks)", price: 89.88, billingPeriod: "jaarlijks" },
  ],
};
