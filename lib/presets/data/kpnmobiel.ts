import type { Preset } from "@/lib/presets/types";

export const kpnmobiel: Preset = {
  id: "kpnmobiel",
  name: "KPN Mobiel",
  category: "Mobiel",
  logoUrl: "https://www.google.com/s2/favicons?domain=kpn.com&sz=64",
  color: "#00B140",
  affiliateUrl: "https://www.kpn.com/mobiel",
  plans: [
    { name: "10 GB", price: 19.5, billingPeriod: "maandelijks" },
    { name: "20 GB", price: 21.5, billingPeriod: "maandelijks" },
    { name: "Unlimited 50 Mbit/s", price: 28.0, billingPeriod: "maandelijks" },
    { name: "Unlimited 400 Mbit/s", price: 33.5, billingPeriod: "maandelijks" },
    { name: "SuperUnlimited", price: 35.5, billingPeriod: "maandelijks" },
  ],
};
