import type { Preset } from "@/lib/presets/types";

export const nintendoswitchonline: Preset = {
  id: "nintendoswitchonline",
  name: "Nintendo Switch Online",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=nintendo.com&sz=64",
  color: "#E60012",
  affiliateUrl: "https://www.nintendo.nl/Nintendo-Switch-Online/",
  plans: [
    { name: "Individueel", price: 19.99, billingPeriod: "jaarlijks" },
    { name: "Gezin", price: 34.99, billingPeriod: "jaarlijks" },
  ],
};
