import type { Preset } from "@/lib/presets/types";

export const worldofwarcraft: Preset = {
  id: "worldofwarcraft",
  name: "World of Warcraft",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=worldofwarcraft.blizzard.com&sz=64",
  color: "#F8B700",
  affiliateUrl: "https://worldofwarcraft.blizzard.com/",
  plans: [
    { name: "1 maand", price: 12.99, billingPeriod: "maandelijks" },
    { name: "3 maanden", price: 35.97, billingPeriod: "kwartaal" },
    { name: "12 maanden", price: 131.88, billingPeriod: "jaarlijks" },
  ],
};
