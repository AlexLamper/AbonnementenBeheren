import type { Preset } from "@/lib/presets/types";

export const basicfit: Preset = {
  id: "basicfit",
  name: "Basic-Fit",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=basic-fit.com&sz=64",
  color: "#FF6600",
  plans: [
    { name: "Comfort", price: 24.99, billingPeriod: "maandelijks" },
    { name: "Premium", price: 29.99, billingPeriod: "maandelijks" },
    { name: "Ultimate", price: 34.99, billingPeriod: "maandelijks" },
  ],
};
