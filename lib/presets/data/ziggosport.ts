import type { Preset } from "@/lib/presets/types";

export const ziggosport: Preset = {
  id: "ziggosport",
  name: "Ziggo Sport Totaal",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=ziggosport.nl&sz=64",
  color: "#F48C00",
  affiliateUrl: "https://www.ziggo.nl/televisie/extra-zenders-streamingdiensten/ziggo-sport-totaal",
  plans: [
    { name: "Ziggo Sport Totaal (Ziggo)", price: 16.95, billingPeriod: "maandelijks" },
    { name: "Ziggo Sport Totaal (KPN)", price: 17.99, billingPeriod: "maandelijks" },
  ],
};
