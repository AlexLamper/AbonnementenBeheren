import type { Preset } from "@/lib/presets/types";

export const cyberghost: Preset = {
  id: "cyberghost",
  name: "CyberGhost VPN",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=cyberghostvpn.com&sz=64",
  color: "#FFCC00",
  affiliateUrl: "https://www.cyberghostvpn.com/nl/",
  plans: [
    { name: "1 maand", price: 12.99, billingPeriod: "maandelijks" },
  ],
};
