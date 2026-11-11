import type { Preset } from "@/lib/presets/types";

export const hinge: Preset = {
  id: "hinge",
  name: "Hinge",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=hinge.co&sz=64",
  color: "#2B2B2B",
  affiliateUrl: "https://hinge.co/",
  plans: [
    { name: "Hinge+", price: 29.99, billingPeriod: "maandelijks" },
    { name: "HingeX", price: 49.99, billingPeriod: "maandelijks" },
  ],
};
