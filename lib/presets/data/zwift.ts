import type { Preset } from "@/lib/presets/types";

export const zwift: Preset = {
  id: "zwift",
  name: "Zwift",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=zwift.com&sz=64",
  color: "#FC6719",
  affiliateUrl: "https://www.zwift.com/eu/memberships",
  plans: [
    { name: "Zwift", price: 19.99, billingPeriod: "maandelijks" },
    { name: "Zwift (jaarlijks)", price: 199.99, billingPeriod: "jaarlijks" },
    { name: "Zwift Plus", price: 29.99, billingPeriod: "maandelijks" },
  ],
};
