import type { Preset } from "@/lib/presets/types";

export const capcut: Preset = {
  id: "capcut",
  name: "CapCut",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=capcut.com&sz=64",
  color: "#000000",
  affiliateUrl: "https://www.capcut.com/nl-nl/",
  plans: [
    { name: "Standard (maand)", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Pro (maand)", price: 23.99, billingPeriod: "maandelijks" },
  ],
};
