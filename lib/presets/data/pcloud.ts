import type { Preset } from "@/lib/presets/types";

export const pcloud: Preset = {
  id: "pcloud",
  name: "pCloud",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=pcloud.com&sz=64",
  color: "#17BED0",
  affiliateUrl: "https://www.pcloud.com/nl/cloud-storage-pricing-plans.html",
  plans: [
    { name: "Premium 500 GB (maand)", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Premium 500 GB (jaar)", price: 49.99, billingPeriod: "jaarlijks" },
    { name: "Premium Plus 2 TB (maand)", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Premium Plus 2 TB (jaar)", price: 99.99, billingPeriod: "jaarlijks" },
  ],
};
