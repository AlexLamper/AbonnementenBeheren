import type { Preset } from "@/lib/presets/types";

export const githubcopilot: Preset = {
  id: "githubcopilot",
  name: "GitHub Copilot",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
  color: "#24292F",
  affiliateUrl: "https://github.com/features/copilot/plans",
  plans: [
    { name: "Pro", price: 10.82, billingPeriod: "maandelijks" },
    { name: "Pro+", price: 42.21, billingPeriod: "maandelijks" },
    { name: "Max", price: 108.22, billingPeriod: "maandelijks" },
  ],
};
