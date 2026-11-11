import type { Preset } from "@/lib/presets/types";

export const minecraftrealms: Preset = {
  id: "minecraftrealms",
  name: "Minecraft Realms",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=minecraft.net&sz=64",
  color: "#3C8527",
  affiliateUrl: "https://www.minecraft.net/nl-nl/realms",
  plans: [
    { name: "Realms (Bedrock)", price: 3.99, billingPeriod: "maandelijks" },
    { name: "Realms Plus (Bedrock)", price: 7.99, billingPeriod: "maandelijks" },
    { name: "Realms (Java Edition)", price: 7.99, billingPeriod: "maandelijks" },
  ],
};
