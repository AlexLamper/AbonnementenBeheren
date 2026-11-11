import type { Preset } from "@/lib/presets/types";

export const geforcenow: Preset = {
  id: "geforcenow",
  name: "GeForce NOW",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=64",
  color: "#76B900",
  affiliateUrl: "https://www.nvidia.com/nl-nl/geforce-now/memberships/",
  plans: [
    { name: "Performance", price: 10.99, billingPeriod: "maandelijks" },
    { name: "Performance (jaarlijks)", price: 109.99, billingPeriod: "jaarlijks" },
    { name: "Ultimate", price: 21.99, billingPeriod: "maandelijks" },
    { name: "Ultimate (jaarlijks)", price: 219.99, billingPeriod: "jaarlijks" },
  ],
};
