import type { Preset } from "@/lib/presets/types";

export const characterai: Preset = {
  id: "characterai",
  name: "Character.AI",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=character.ai&sz=64",
  color: "#1A1A1A",
  affiliateUrl: "https://character.ai/",
  plans: [
    { name: "c.ai+", price: 10.81, billingPeriod: "maandelijks" },
    { name: "c.ai+ (jaarlijks)", price: 102.8, billingPeriod: "jaarlijks" },
  ],
};
