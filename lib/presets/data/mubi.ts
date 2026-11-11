import type { Preset } from "@/lib/presets/types";

export const mubi: Preset = {
  id: "mubi",
  name: "MUBI",
  category: "Streaming",
  logoUrl: "https://www.google.com/s2/favicons?domain=mubi.com&sz=64",
  color: "#001489",
  affiliateUrl: "https://mubi.com/nl/memberships",
  plans: [
    { name: "MUBI", price: 13.99, billingPeriod: "maandelijks" },
    { name: "MUBI (jaarlijks)", price: 107.88, billingPeriod: "jaarlijks" },
  ],
};
