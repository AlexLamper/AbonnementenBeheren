import type { Preset } from "@/lib/presets/types";

export const qobuz: Preset = {
  id: "qobuz",
  name: "Qobuz",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=qobuz.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.qobuz.com/nl-nl/music/streaming/offers/studio",
  plans: [
    { name: "Studio Solo", price: 15.99, billingPeriod: "maandelijks" },
    { name: "Studio Solo (jaarlijks)", price: 161.99, billingPeriod: "jaarlijks" },
    { name: "Studio Duo", price: 19.99, billingPeriod: "maandelijks" },
    { name: "Studio Family", price: 24.99, billingPeriod: "maandelijks" },
    { name: "Studio Student", price: 5.99, billingPeriod: "maandelijks" },
  ],
};
