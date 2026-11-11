import type { Preset } from "@/lib/presets/types";

export const flitsmeister: Preset = {
  id: "flitsmeister",
  name: "Flitsmeister",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=flitsmeister.nl&sz=64",
  color: "#E4003A",
  affiliateUrl: "https://www.flitsmeister.nl/",
  plans: [
    { name: "PRO", price: 2.99, billingPeriod: "maandelijks" },
  ],
};
