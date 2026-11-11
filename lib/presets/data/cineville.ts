import type { Preset } from "@/lib/presets/types";

export const cineville: Preset = {
  id: "cineville",
  name: "Cineville",
  category: "Uitjes & Cultuur",
  logoUrl: "https://www.google.com/s2/favicons?domain=cineville.nl&sz=64",
  color: "#111111",
  affiliateUrl: "https://www.cineville.nl/",
  plans: [
    { name: "Cineville", price: 24.0, billingPeriod: "maandelijks" },
    { name: "Cineville t/m 29 jaar", price: 19.0, billingPeriod: "maandelijks" },
  ],
};
