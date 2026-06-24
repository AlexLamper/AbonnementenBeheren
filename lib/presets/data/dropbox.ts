import type { Preset } from "@/lib/presets/types";

export const dropbox: Preset = {
  id: "dropbox",
  name: "Dropbox",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=dropbox.com&sz=64",
  color: "#0061FF",
  affiliateUrl: "https://www.dropbox.com/plans",
  plans: [
    { name: "Plus (2TB)", price: 11.99, billingPeriod: "maandelijks" },
    { name: "Essentials (3TB)", price: 18.0, billingPeriod: "maandelijks" },
  ],
};
