import type { Preset } from "@/lib/presets/types";

export const trainmore: Preset = {
  id: "trainmore",
  name: "TrainMore",
  category: "Sport",
  logoUrl: "https://www.google.com/s2/favicons?domain=trainmore.com&sz=64",
  color: "#111111",
  affiliateUrl: "https://trainmore.com/nl-NL/memberships/",
  plans: [
    { name: "Standard", price: 24.95, billingPeriod: "maandelijks" },
  ],
};
