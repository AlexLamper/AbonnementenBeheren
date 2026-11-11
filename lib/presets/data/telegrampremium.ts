import type { Preset } from "@/lib/presets/types";

export const telegrampremium: Preset = {
  id: "telegrampremium",
  name: "Telegram Premium",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=telegram.org&sz=64",
  color: "#26A5E4",
  affiliateUrl: "https://telegram.org/",
  plans: [
    { name: "Premium", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 35.99, billingPeriod: "jaarlijks" },
  ],
};
