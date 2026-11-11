import type { Preset } from "@/lib/presets/types";

export const vodafone: Preset = {
  id: "vodafone",
  name: "Vodafone",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=vodafone.nl&sz=64",
  color: "#E60000",
  affiliateUrl: "https://www.vodafone.nl/",
  plans: [
    { name: "3 GB", price: 15.0, billingPeriod: "maandelijks" },
    { name: "15 GB", price: 20.0, billingPeriod: "maandelijks" },
    { name: "30 GB", price: 24.5, billingPeriod: "maandelijks" },
    { name: "Unlimited Start", price: 28.5, billingPeriod: "maandelijks" },
    { name: "Unlimited Plus", price: 33.5, billingPeriod: "maandelijks" },
  ],
};
