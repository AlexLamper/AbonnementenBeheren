import type { Preset } from "@/lib/presets/types";

export const urbansportsclub: Preset = {
  id: "urbansportsclub",
  name: "Urban Sports Club",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=urbansportsclub.com&sz=64",
  color: "#0B1F3A",
  affiliateUrl: "https://urbansportsclub.com/nl/prices",
  plans: [
    { name: "Essential", price: 29, billingPeriod: "maandelijks" },
    { name: "Classic", price: 64, billingPeriod: "maandelijks" },
    { name: "Premium", price: 104, billingPeriod: "maandelijks" },
    { name: "Max", price: 154, billingPeriod: "maandelijks" },
  ],
};
