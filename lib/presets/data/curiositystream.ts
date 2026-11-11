import type { Preset } from "@/lib/presets/types";

export const curiositystream: Preset = {
  id: "curiositystream",
  name: "CuriosityStream",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=curiositystream.com&sz=64",
  color: "#F7B500",
  affiliateUrl: "https://curiositystream.com/",
  plans: [
    { name: "Standard", price: 4.99, billingPeriod: "maandelijks" },
    { name: "Standard (jaarlijks)", price: 39.99, billingPeriod: "jaarlijks" },
  ],
};
