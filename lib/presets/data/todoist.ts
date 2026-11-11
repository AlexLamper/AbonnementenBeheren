import type { Preset } from "@/lib/presets/types";

export const todoist: Preset = {
  id: "todoist",
  name: "Todoist",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=todoist.com&sz=64",
  color: "#E44332",
  affiliateUrl: "https://www.todoist.com/nl/pricing",
  plans: [
    { name: "Pro (maand)", price: 7.0, billingPeriod: "maandelijks" },
    { name: "Pro (jaar)", price: 60.0, billingPeriod: "jaarlijks" },
  ],
};
