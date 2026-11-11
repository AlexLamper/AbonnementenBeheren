import type { Preset } from "@/lib/presets/types";

export const nsflex: Preset = {
  id: "nsflex",
  name: "NS Flex",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=ns.nl&sz=64",
  color: "#FFC917",
  affiliateUrl: "https://www.ns.nl/producten/volwassenen",
  plans: [
    { name: "Dal Voordeel", price: 6.35, billingPeriod: "maandelijks" },
    { name: "Weekend Vrij", price: 39.5, billingPeriod: "maandelijks" },
    { name: "Dal Vrij", price: 127.95, billingPeriod: "maandelijks" },
    { name: "Altijd Vrij", price: 399.95, billingPeriod: "maandelijks" },
  ],
};
