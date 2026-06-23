import type { Preset } from "@/lib/presets/types";

export const adobe: Preset = {
  id: "adobe",
  name: "Adobe Creative Cloud",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=adobe.com&sz=64",
  color: "#FF0000",
  plans: [
    { name: "Photoshop", price: 25.79, billingPeriod: "maandelijks" },
    { name: "Alle apps", price: 65.99, billingPeriod: "maandelijks" },
  ],
};
