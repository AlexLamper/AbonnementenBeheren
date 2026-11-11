import type { Preset } from "@/lib/presets/types";

export const espn: Preset = {
  id: "espn",
  name: "ESPN",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=espn.nl&sz=64",
  color: "#CC0000",
  affiliateUrl: "https://www.espn.nl/",
  plans: [
    { name: "ESPN Premium (Ziggo)", price: 9.95, billingPeriod: "maandelijks" },
    { name: "ESPN Compleet (DELTA/Youfone)", price: 10.0, billingPeriod: "maandelijks" },
    { name: "ESPN Compleet (Odido)", price: 12.5, billingPeriod: "maandelijks" },
    { name: "ESPN Compleet (KPN)", price: 14.99, billingPeriod: "maandelijks" },
  ],
};
