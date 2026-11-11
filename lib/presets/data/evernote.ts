import type { Preset } from "@/lib/presets/types";

export const evernote: Preset = {
  id: "evernote",
  name: "Evernote",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=evernote.com&sz=64",
  color: "#00A82D",
  affiliateUrl: "https://evernote.com/compare-plans",
  plans: [
    { name: "Personal (maand)", price: 14.99, billingPeriod: "maandelijks" },
    { name: "Personal (jaar)", price: 129.99, billingPeriod: "jaarlijks" },
    { name: "Professional (maand)", price: 17.99, billingPeriod: "maandelijks" },
    { name: "Professional (jaar)", price: 169.99, billingPeriod: "jaarlijks" },
  ],
};
