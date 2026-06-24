import type { Preset } from "@/lib/presets/types";

export const googleone: Preset = {
  id: "googleone",
  name: "Google One",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=one.google.com&sz=64",
  color: "#4285F4",
  affiliateUrl: "https://one.google.com/about/plans",
  plans: [
    { name: "Basic 100GB", price: 1.99, billingPeriod: "maandelijks" },
    { name: "Standard 200GB", price: 2.99, billingPeriod: "maandelijks" },
    { name: "Premium 2TB", price: 9.99, billingPeriod: "maandelijks" },
  ],
};
