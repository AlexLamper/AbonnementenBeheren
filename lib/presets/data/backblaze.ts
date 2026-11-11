import type { Preset } from "@/lib/presets/types";

export const backblaze: Preset = {
  id: "backblaze",
  name: "Backblaze",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=backblaze.com&sz=64",
  color: "#E21E29",
  affiliateUrl: "https://www.backblaze.com/cloud-backup/pricing",
  plans: [
    { name: "Personal Backup (maand)", price: 9.8, billingPeriod: "maandelijks" },
    { name: "Personal Backup (jaar)", price: 107.81, billingPeriod: "jaarlijks" },
  ],
};
