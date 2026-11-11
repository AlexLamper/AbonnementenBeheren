import type { Preset } from "@/lib/presets/types";

export const runna: Preset = {
  id: "runna",
  name: "Runna",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=runna.com&sz=64",
  color: "#5B3DF5",
  affiliateUrl: "https://www.runna.com/nl/pricing",
  plans: [
    { name: "Premium", price: 19.99, billingPeriod: "maandelijks" },
    { name: "Premium (jaarlijks)", price: 119.99, billingPeriod: "jaarlijks" },
  ],
};
