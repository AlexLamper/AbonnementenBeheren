import type { Preset } from "@/lib/presets/types";

export const rakutenviki: Preset = {
  id: "rakutenviki",
  name: "Rakuten Viki",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=viki.com&sz=64",
  color: "#1CA2E5",
  affiliateUrl: "https://www.viki.com/pass",
  plans: [{ name: "Viki Pass Standard", price: 5.99, billingPeriod: "maandelijks" }],
};
