import type { Preset } from "@/lib/presets/types";

export const evernote: Preset = {
  id: "evernote",
  name: "Evernote",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=evernote.com&sz=64",
  color: "#00A82D",
  affiliateUrl: "https://evernote.com/compare-plans",
  plans: [
    { name: "Starter (maand)", price: 12.99, billingPeriod: "maandelijks" },
    { name: "Starter (jaar)", price: 79.9, billingPeriod: "jaarlijks" },
    { name: "Advanced (maand)", price: 21.99, billingPeriod: "maandelijks" },
    { name: "Advanced (jaar)", price: 199.99, billingPeriod: "jaarlijks" },
  ],
};
