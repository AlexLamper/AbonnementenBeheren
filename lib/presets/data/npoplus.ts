import type { Preset } from "@/lib/presets/types";

export const npoplus: Preset = {
  id: "npoplus",
  name: "NPO Plus",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=npo.nl&sz=64",
  color: "#FF6D00",
  affiliateUrl: "https://www.npo.nl/start",
  plans: [{ name: "NPO Plus", price: 3.49, billingPeriod: "maandelijks" }],
};
