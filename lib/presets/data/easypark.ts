import type { Preset } from "@/lib/presets/types";

export const easypark: Preset = {
  id: "easypark",
  name: "EasyPark",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=easypark.com&sz=64",
  color: "#E6007E",
  affiliateUrl: "https://www.easypark.com/",
  plans: [
    { name: "Abonnement", price: 4.99, billingPeriod: "maandelijks" },
  ],
};
