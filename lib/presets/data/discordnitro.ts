import type { Preset } from "@/lib/presets/types";

export const discordnitro: Preset = {
  id: "discordnitro",
  name: "Discord Nitro",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=discord.com&sz=64",
  color: "#5865F2",
  affiliateUrl: "https://discord.com/nitro",
  plans: [
    { name: "Nitro Basic", price: 2.99, billingPeriod: "maandelijks" },
    { name: "Nitro Basic (jaarlijks)", price: 29.99, billingPeriod: "jaarlijks" },
    { name: "Nitro", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Nitro (jaarlijks)", price: 99.99, billingPeriod: "jaarlijks" },
  ],
};
