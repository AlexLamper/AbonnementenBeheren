import type { Preset } from "@/lib/presets/types";

export const cursor: Preset = {
  id: "cursor",
  name: "Cursor",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=cursor.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://cursor.com/pricing",
  plans: [
    { name: "Pro", price: 21.64, billingPeriod: "maandelijks" },
    { name: "Pro+", price: 64.93, billingPeriod: "maandelijks" },
    { name: "Ultra", price: 216.44, billingPeriod: "maandelijks" },
  ],
};
