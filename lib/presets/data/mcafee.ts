import type { Preset } from "@/lib/presets/types";

export const mcafee: Preset = {
  id: "mcafee",
  name: "McAfee",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=mcafee.com&sz=64",
  color: "#C01818",
  affiliateUrl: "https://www.mcafee.com/nl-nl/antivirus/mcafee-total-protection.html",
  plans: [
    { name: "Total Protection Essential (1e jaar)", price: 44.99, billingPeriod: "jaarlijks" },
    { name: "Total Protection Essential (verlenging)", price: 109.99, billingPeriod: "jaarlijks" },
  ],
};
