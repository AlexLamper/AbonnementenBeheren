import type { Preset } from "@/lib/presets/types";

export const jetbrains: Preset = {
  id: "jetbrains",
  name: "JetBrains",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=jetbrains.com&sz=64",
  color: "#FE315D",
  affiliateUrl: "https://www.jetbrains.com/store/#personal",
  plans: [
    { name: "IntelliJ IDEA Ultimate (maand)", price: 24.08, billingPeriod: "maandelijks" },
    { name: "IntelliJ IDEA Ultimate (jaar)", price: 240.79, billingPeriod: "jaarlijks" },
    { name: "All Products Pack (maand)", price: 36.18, billingPeriod: "maandelijks" },
    { name: "All Products Pack (jaar)", price: 361.79, billingPeriod: "jaarlijks" },
  ],
};
