import type { Preset } from "@/lib/presets/types";

export const myfitnesspal: Preset = {
  id: "myfitnesspal",
  name: "MyFitnessPal",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=myfitnesspal.com&sz=64",
  color: "#0066EE",
  affiliateUrl: "https://www.myfitnesspal.com/premium",
  plans: [
    { name: "Premium", price: 21.99, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 87.99, billingPeriod: "jaarlijks" },
  ],
};
