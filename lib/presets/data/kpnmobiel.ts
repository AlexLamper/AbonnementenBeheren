import type { Preset } from "@/lib/presets/types";

export const kpnmobiel: Preset = {
  id: "kpnmobiel",
  name: "KPN Mobiel",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=kpn.com&sz=64",
  color: "#00B140",
  affiliateUrl: "https://www.kpn.com/mobiel",
  plans: [
    { name: "8 GB", price: 17.5, billingPeriod: "maandelijks" },
    { name: "15 GB", price: 20.0, billingPeriod: "maandelijks" },
    { name: "Unlimited 50 Mbit/s", price: 26.5, billingPeriod: "maandelijks" },
    { name: "SuperUnlimited", price: 34.0, billingPeriod: "maandelijks" },
  ],
};
