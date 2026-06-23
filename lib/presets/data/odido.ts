import type { Preset } from "@/lib/presets/types";

export const odido: Preset = {
  id: "odido",
  name: "Odido",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=odido.nl&sz=64",
  color: "#E5007D",
  plans: [
    { name: "Mobiel 5GB", price: 15.0, billingPeriod: "maandelijks" },
    { name: "Mobiel Unlimited", price: 27.5, billingPeriod: "maandelijks" },
  ],
};
