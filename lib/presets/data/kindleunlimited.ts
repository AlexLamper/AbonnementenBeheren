import type { Preset } from "@/lib/presets/types";

export const kindleunlimited: Preset = {
  id: "kindleunlimited",
  name: "Kindle Unlimited",
  category: "Boeken",
  logoUrl: "https://www.google.com/s2/favicons?domain=amazon.nl&sz=64",
  color: "#146EB4",
  affiliateUrl: "https://www.amazon.nl/kindle-dbs/hz/subscribe/ku",
  plans: [{ name: "Kindle Unlimited", price: 9.99, billingPeriod: "maandelijks" }],
};
