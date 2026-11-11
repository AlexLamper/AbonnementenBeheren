import type { Preset } from "@/lib/presets/types";

export const elevenlabs: Preset = {
  id: "elevenlabs",
  name: "ElevenLabs",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=64",
  color: "#000000",
  affiliateUrl: "https://elevenlabs.io/pricing",
  plans: [
    { name: "Starter", price: 6.49, billingPeriod: "maandelijks" },
    { name: "Creator", price: 23.81, billingPeriod: "maandelijks" },
    { name: "Pro", price: 107.14, billingPeriod: "maandelijks" },
    { name: "Creator (jaarlijks)", price: 238.08, billingPeriod: "jaarlijks" },
  ],
};
