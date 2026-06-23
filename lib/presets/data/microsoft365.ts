import type { Preset } from "@/lib/presets/types";

export const microsoft365: Preset = {
  id: "microsoft365",
  name: "Microsoft 365",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=64",
  color: "#D83B01",
  affiliateUrl: "https://www.microsoft.com/nl-nl/microsoft-365/buy/compare-all-microsoft-365-products",
  plans: [
    { name: "Personal (maand)", price: 10.0, billingPeriod: "maandelijks" },
    { name: "Personal (jaar)", price: 99.0, billingPeriod: "jaarlijks" },
    { name: "Family (maand)", price: 13.0, billingPeriod: "maandelijks" },
    { name: "Family (jaar)", price: 129.0, billingPeriod: "jaarlijks" },
  ],
};
