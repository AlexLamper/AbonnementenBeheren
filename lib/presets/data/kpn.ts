import type { Preset } from "@/lib/presets/types";

export const kpn: Preset = {
  id: "kpn",
  name: "KPN",
  category: "Internet & TV",
  logoUrl: "https://www.google.com/s2/favicons?domain=kpn.com&sz=64",
  color: "#00B140",
  affiliateUrl: "https://www.kpn.com/internet.htm",
  plans: [
    { name: "Internet", price: 52.5, billingPeriod: "maandelijks" },
    { name: "Internet & TV", price: 65.25, billingPeriod: "maandelijks" },
  ],
};
