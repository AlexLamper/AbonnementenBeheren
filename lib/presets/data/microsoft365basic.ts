import type { Preset } from "@/lib/presets/types";

export const microsoft365basic: Preset = {
  id: "microsoft365basic",
  name: "Microsoft 365 Basic",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=onedrive.com&sz=64",
  color: "#0078D4",
  affiliateUrl: "https://www.microsoft.com/nl-nl/microsoft-365/onedrive/compare-onedrive-plans",
  plans: [
    { name: "Basic (maand)", price: 2.0, billingPeriod: "maandelijks" },
    { name: "Basic (jaar)", price: 20.0, billingPeriod: "jaarlijks" },
  ],
};
