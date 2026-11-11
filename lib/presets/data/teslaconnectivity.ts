import type { Preset } from "@/lib/presets/types";

export const teslaconnectivity: Preset = {
  id: "teslaconnectivity",
  name: "Tesla Premium Connectivity",
  category: "Mobiliteit",
  logoUrl: "https://www.google.com/s2/favicons?domain=tesla.com&sz=64",
  color: "#E31937",
  affiliateUrl: "https://www.tesla.com/nl_NL/support/connectivity",
  plans: [
    { name: "Premium Connectivity", price: 9.99, billingPeriod: "maandelijks" },
  ],
};
