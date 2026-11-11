import type { Preset } from "@/lib/presets/types";

export const canalplus: Preset = {
  id: "canalplus",
  name: "Canal+",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=canalplus.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.canalplus.nl/",
  plans: [
    { name: "Films & Series", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Start", price: 9.99, billingPeriod: "maandelijks" },
  ],
};
