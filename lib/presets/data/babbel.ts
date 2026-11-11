import type { Preset } from "@/lib/presets/types";

export const babbel: Preset = {
  id: "babbel",
  name: "Babbel",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=babbel.com&sz=64",
  color: "#FF6400",
  affiliateUrl: "https://www.babbel.com/",
  plans: [
    { name: "1 maand", price: 12.99, billingPeriod: "maandelijks" },
    { name: "3 maanden", price: 29.97, billingPeriod: "kwartaal" },
    { name: "12 maanden", price: 83.88, billingPeriod: "jaarlijks" },
  ],
};
