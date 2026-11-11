import type { Preset } from "@/lib/presets/types";

export const bookbeat: Preset = {
  id: "bookbeat",
  name: "BookBeat",
  category: "Boeken",
  logoUrl: "https://www.google.com/s2/favicons?domain=bookbeat.com&sz=64",
  color: "#F0466E",
  affiliateUrl: "https://www.bookbeat.com/nl/our-subscriptions",
  plans: [
    { name: "Basic", price: 8.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Basic Student", price: 5.99, billingPeriod: "maandelijks" },
  ],
};
