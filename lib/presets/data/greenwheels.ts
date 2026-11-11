import type { Preset } from "@/lib/presets/types";

export const greenwheels: Preset = {
  id: "greenwheels",
  name: "Greenwheels",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=greenwheels.nl&sz=64",
  color: "#00A651",
  affiliateUrl: "https://www.greenwheels.nl/",
  plans: [
    { name: "Regelmatig", price: 10.0, billingPeriod: "maandelijks" },
    { name: "Vaak", price: 25.0, billingPeriod: "maandelijks" },
  ],
};
