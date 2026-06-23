import type { Preset } from "@/lib/presets/types";

// Prijzen zijn indicatief (NL) en kunnen wijzigen.
export const spotify: Preset = {
  id: "spotify",
  name: "Spotify",
  category: "Muziek",
  logoUrl: "https://www.google.com/s2/favicons?domain=spotify.com&sz=64",
  color: "#1DB954",
  affiliateUrl: undefined,
  plans: [
    { name: "Individual", price: 12.99, billingPeriod: "maandelijks" },
    { name: "Student", price: 6.99, billingPeriod: "maandelijks" },
    { name: "Duo", price: 17.99, billingPeriod: "maandelijks" },
    { name: "Family", price: 21.99, billingPeriod: "maandelijks" },
  ],
};
