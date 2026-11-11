import type { Preset } from "@/lib/presets/types";

export const mega: Preset = {
  id: "mega",
  name: "MEGA",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=mega.io&sz=64",
  color: "#D9272E",
  affiliateUrl: "https://mega.io/pricing",
  plans: [
    { name: "Pro Lite (maand)", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Pro I (maand)", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Pro I (jaar)", price: 99.99, billingPeriod: "jaarlijks" },
    { name: "Pro II (maand)", price: 19.99, billingPeriod: "maandelijks" },
    { name: "Pro III (maand)", price: 29.99, billingPeriod: "maandelijks" },
  ],
};
