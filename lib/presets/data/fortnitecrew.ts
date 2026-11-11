import type { Preset } from "@/lib/presets/types";

export const fortnitecrew: Preset = {
  id: "fortnitecrew",
  name: "Fortnite Crew",
  category: "Gaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=fortnite.com&sz=64",
  color: "#9D4DBB",
  affiliateUrl: "https://www.fortnite.com/fortnite-crew-subscription",
  plans: [
    { name: "Fortnite Crew", price: 11.99, billingPeriod: "maandelijks" },
  ],
};
