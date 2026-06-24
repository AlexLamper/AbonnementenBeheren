import type { Preset } from "@/lib/presets/types";

export const xboxgamepass: Preset = {
  id: "xboxgamepass",
  name: "Xbox Game Pass",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=xbox.com&sz=64",
  color: "#107C10",
  affiliateUrl: "https://www.xbox.com/nl-NL/xbox-game-pass",
  plans: [
    { name: "Core", price: 6.99, billingPeriod: "maandelijks" },
    { name: "PC Game Pass", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Ultimate", price: 17.99, billingPeriod: "maandelijks" },
  ],
};
