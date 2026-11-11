import type { Preset } from "@/lib/presets/types";

export const garminconnectplus: Preset = {
  id: "garminconnectplus",
  name: "Garmin Connect+",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=garmin.com&sz=64",
  color: "#007CC3",
  affiliateUrl: "https://connect.garmin.com/",
  plans: [
    { name: "Connect+", price: 8.99, billingPeriod: "maandelijks" },
    { name: "Connect+ (jaarlijks)", price: 89.99, billingPeriod: "jaarlijks" },
  ],
};
