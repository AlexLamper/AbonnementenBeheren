import type { Preset } from "@/lib/presets/types";

export const podimo: Preset = {
  id: "podimo",
  name: "Podimo",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=podimo.com&sz=64",
  color: "#6C2BD9",
  affiliateUrl: "https://podimo.com/nl",
  plans: [
    { name: "Premium", price: 9.99, billingPeriod: "maandelijks" },
    { name: "Premium Plus", price: 13.99, billingPeriod: "maandelijks" },
  ],
};
