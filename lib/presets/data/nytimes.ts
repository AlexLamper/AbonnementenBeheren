import type { Preset } from "@/lib/presets/types";

export const nytimes: Preset = {
  id: "nytimes",
  name: "The New York Times",
  category: "Nieuws & Tijdschriften",
  logoUrl: "https://www.google.com/s2/favicons?domain=nytimes.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.nytimes.com/subscription",
  plans: [
    { name: "Basic Digital", price: 17.0, billingPeriod: "maandelijks" },
    { name: "All Access", price: 25.0, billingPeriod: "maandelijks" },
  ],
};
