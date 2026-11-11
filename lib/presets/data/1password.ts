import type { Preset } from "@/lib/presets/types";

export const onePassword: Preset = {
  id: "1password",
  name: "1Password",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=1password.com&sz=64",
  color: "#0572EC",
  affiliateUrl: "https://1password.com/pricing/password-manager",
  plans: [
    { name: "Individual (maand)", price: 4.39, billingPeriod: "maandelijks" },
    { name: "Individual (jaar)", price: 43.8, billingPeriod: "jaarlijks" },
    { name: "Families (maand)", price: 6.99, billingPeriod: "maandelijks" },
    { name: "Families (jaar)", price: 69.0, billingPeriod: "jaarlijks" },
  ],
};
