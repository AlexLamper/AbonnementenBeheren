import type { Preset } from "@/lib/presets/types";

export const nordvpn: Preset = {
  id: "nordvpn",
  name: "NordVPN",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=nordvpn.com&sz=64",
  color: "#4687FF",
  affiliateUrl: "https://nordvpn.com/nl/",
  plans: [{ name: "Standaard (maand)", price: 12.99, billingPeriod: "maandelijks" }],
};
