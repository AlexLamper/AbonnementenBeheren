import type { Preset } from "@/lib/presets/types";

export const bitdefender: Preset = {
  id: "bitdefender",
  name: "Bitdefender",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=bitdefender.com&sz=64",
  color: "#ED1C24",
  affiliateUrl: "https://www.bitdefender.com/nl-nl/consumer/total-security",
  plans: [
    { name: "Total Security (5 apparaten)", price: 49.99, billingPeriod: "jaarlijks" },
    { name: "Total Security Family", price: 79.99, billingPeriod: "jaarlijks" },
    { name: "Premium Security", price: 69.99, billingPeriod: "jaarlijks" },
  ],
};
