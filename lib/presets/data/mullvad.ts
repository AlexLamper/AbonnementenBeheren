import type { Preset } from "@/lib/presets/types";

export const mullvad: Preset = {
  id: "mullvad",
  name: "Mullvad VPN",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=mullvad.net&sz=64",
  color: "#294D73",
  affiliateUrl: "https://mullvad.net/en/pricing",
  plans: [
    { name: "1 maand", price: 5.0, billingPeriod: "maandelijks" },
    { name: "1 jaar", price: 60.0, billingPeriod: "jaarlijks" },
  ],
};
