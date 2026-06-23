import type { Preset } from "@/lib/presets/types";

export const chatgpt: Preset = {
  id: "chatgpt",
  name: "ChatGPT",
  category: "AI & Software",
  logoUrl: "https://www.google.com/s2/favicons?domain=openai.com&sz=64",
  color: "#10A37F",
  affiliateUrl: "https://chatgpt.com/pricing",
  plans: [
    { name: "Plus", price: 22.99, billingPeriod: "maandelijks" },
    { name: "Pro", price: 229.0, billingPeriod: "maandelijks" },
  ],
};
