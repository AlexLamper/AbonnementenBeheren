import type { Preset } from "@/lib/presets/types";

export const cleanmymac: Preset = {
  id: "cleanmymac",
  name: "CleanMyMac",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=cleanmymac.com&sz=64",
  color: "#E5397C",
  affiliateUrl: "https://cleanmymac.com/",
  plans: [
    { name: "1 Mac (maand)", price: 9.95, billingPeriod: "maandelijks" },
    { name: "1 Mac (jaar)", price: 39.95, billingPeriod: "jaarlijks" },
    { name: "2 Macs (jaar)", price: 63.95, billingPeriod: "jaarlijks" },
    { name: "5 Macs (jaar)", price: 127.95, billingPeriod: "jaarlijks" },
  ],
};
