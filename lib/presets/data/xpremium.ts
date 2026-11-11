import type { Preset } from "@/lib/presets/types";

export const xpremium: Preset = {
  id: "xpremium",
  name: "X Premium",
  category: "Apps & Lifestyle",
  logoUrl: "https://www.google.com/s2/favicons?domain=x.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://x.com/i/premium_sign_up",
  plans: [
    { name: "Basic", price: 3.63, billingPeriod: "maandelijks" },
    { name: "Premium", price: 9.68, billingPeriod: "maandelijks" },
    { name: "Premium+", price: 48.4, billingPeriod: "maandelijks" },
  ],
};
