import {
  siAppletv,
  siApplemusic,
  siAudible,
  siDeezer,
  siDropbox,
  siGoogle,
  siHbomax,
  siIcloud,
  siNetflix,
  siNordvpn,
  siOdido,
  siPlaystation,
  siSpotify,
  siStrava,
  siTidal,
  siViaplay,
  siYoutube,
  siYoutubemusic,
  siZiggo,
} from "simple-icons";

/** Een merk-icoon: SVG-pad (viewBox 0 0 24 24) plus tegel- en glyphkleur. */
export interface BrandIcon {
  path: string;
  bg: string;
  fg: string;
}

type SimpleIcon = { path: string; hex: string };

/** Witte glyph, behalve op heel lichte merkkleuren. */
function icon(si: SimpleIcon, overrides: Partial<BrandIcon> = {}): BrandIcon {
  const hex = `#${si.hex}`;
  const n = parseInt(si.hex, 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return { path: si.path, bg: hex, fg: lum > 170 ? "#000000" : "#FFFFFF", ...overrides };
}

/**
 * Merkiconen (Simple Icons, CC0) per preset-id. Diensten zonder icoon vallen
 * terug op hun favicon of een gekleurde initiaal.
 */
export const BRAND_ICONS: Record<string, BrandIcon> = {
  applemusic: icon(siApplemusic),
  appletv: icon(siAppletv),
  audible: icon(siAudible),
  deezer: icon(siDeezer),
  dropbox: icon(siDropbox),
  googleone: icon(siGoogle, { bg: "#4285F4" }),
  max: icon(siHbomax),
  icloud: icon(siIcloud),
  netflix: icon(siNetflix, { bg: "#141414", fg: "#E50914" }),
  nordvpn: icon(siNordvpn),
  odido: icon(siOdido),
  playstationplus: icon(siPlaystation),
  spotify: icon(siSpotify, { fg: "#000000" }),
  strava: icon(siStrava),
  tidal: icon(siTidal),
  viaplay: icon(siViaplay),
  youtubepremium: icon(siYoutube),
  youtubemusic: icon(siYoutubemusic),
  ziggo: icon(siZiggo),
};

/** Zoek het merkicoon op preset-id, of anders op (genormaliseerde) naam. */
export function findBrandIcon(presetId?: string, name?: string): BrandIcon | undefined {
  if (presetId && BRAND_ICONS[presetId]) return BRAND_ICONS[presetId];
  if (!name) return undefined;
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return BRAND_ICONS[key] ?? BRAND_ICONS[key.replace(/plus$/, "")];
}
