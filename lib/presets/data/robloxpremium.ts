import type { Preset } from "@/lib/presets/types";

export const robloxpremium: Preset = {
  id: "robloxpremium",
  name: "Roblox Premium",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=roblox.com&sz=64",
  color: "#232527",
  affiliateUrl: "https://www.roblox.com/premium/membership",
  plans: [
    { name: "Premium 450", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Premium 1000", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Premium 2200", price: 19.99, billingPeriod: "maandelijks" },
  ],
};
