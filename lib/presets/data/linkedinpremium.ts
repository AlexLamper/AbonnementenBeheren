import type { Preset } from "@/lib/presets/types";

export const linkedinpremium: Preset = {
  id: "linkedinpremium",
  name: "LinkedIn Premium",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
  color: "#0A66C2",
  affiliateUrl: "https://premium.linkedin.com/",
  plans: [
    { name: "Premium Career", price: 39.99, billingPeriod: "maandelijks" },
    { name: "Premium Career (jaarlijks)", price: 239.88, billingPeriod: "jaarlijks" },
    { name: "Premium Business", price: 59.99, billingPeriod: "maandelijks" },
  ],
};
