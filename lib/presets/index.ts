import type { Preset } from "@/lib/presets/types";
import { spotify } from "@/lib/presets/data/spotify";
import { netflix } from "@/lib/presets/data/netflix";
import { disneyplus } from "@/lib/presets/data/disneyplus";
import { videoland } from "@/lib/presets/data/videoland";
import { max } from "@/lib/presets/data/max";
import { chatgpt } from "@/lib/presets/data/chatgpt";
import { microsoft365 } from "@/lib/presets/data/microsoft365";
import { adobe } from "@/lib/presets/data/adobe";
import { basicfit } from "@/lib/presets/data/basicfit";
import { ziggo } from "@/lib/presets/data/ziggo";
import { kpn } from "@/lib/presets/data/kpn";
import { odido } from "@/lib/presets/data/odido";
import { amazonprime } from "@/lib/presets/data/amazonprime";
import { appletv } from "@/lib/presets/data/appletv";
import { skyshowtime } from "@/lib/presets/data/skyshowtime";
import { youtubepremium } from "@/lib/presets/data/youtubepremium";
import { viaplay } from "@/lib/presets/data/viaplay";
import { nlziet } from "@/lib/presets/data/nlziet";
import { applemusic } from "@/lib/presets/data/applemusic";
import { youtubemusic } from "@/lib/presets/data/youtubemusic";
import { tidal } from "@/lib/presets/data/tidal";
import { deezer } from "@/lib/presets/data/deezer";
import { audible } from "@/lib/presets/data/audible";
import { storytel } from "@/lib/presets/data/storytel";
import { googleone } from "@/lib/presets/data/googleone";
import { icloud } from "@/lib/presets/data/icloud";
import { dropbox } from "@/lib/presets/data/dropbox";
import { canva } from "@/lib/presets/data/canva";
import { nordvpn } from "@/lib/presets/data/nordvpn";
import { playstationplus } from "@/lib/presets/data/playstationplus";
import { xboxgamepass } from "@/lib/presets/data/xboxgamepass";
import { nintendoswitchonline } from "@/lib/presets/data/nintendoswitchonline";
import { strava } from "@/lib/presets/data/strava";

// Nieuwe diensten: maak een bestand in data/ en voeg het hier toe.
export const PRESETS: Preset[] = [
  spotify,
  netflix,
  disneyplus,
  videoland,
  max,
  chatgpt,
  microsoft365,
  adobe,
  basicfit,
  ziggo,
  kpn,
  odido,
  amazonprime,
  appletv,
  skyshowtime,
  youtubepremium,
  viaplay,
  nlziet,
  applemusic,
  youtubemusic,
  tidal,
  deezer,
  audible,
  storytel,
  googleone,
  icloud,
  dropbox,
  canva,
  nordvpn,
  playstationplus,
  xboxgamepass,
  nintendoswitchonline,
  strava,
].sort((a, b) => a.name.localeCompare(b.name, "nl"));

/**
 * Case-insensitieve zoekfunctie op dienstnaam en categorie.
 * Pure functie: werkt op de meegegeven lijst (uit de database of de
 * statische `PRESETS`-fallback), zodat dit ook client-side bruikbaar is.
 */
export function searchPresets(query: string, presets: Preset[] = PRESETS): Preset[] {
  const q = query.trim().toLowerCase();
  if (!q) return presets;
  return presets.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getPreset(id: string, presets: Preset[] = PRESETS): Preset | undefined {
  return presets.find((p) => p.id === id);
}

/** Volgorde van populaire diensten, getoond als suggesties bij lege zoekopdracht. */
export const POPULAR_IDS = [
  "spotify",
  "netflix",
  "disneyplus",
  "chatgpt",
  "adobe",
  "youtubepremium",
  "amazonprime",
  "playstationplus",
];

/**
 * Populaire suggesties voor de lege zoekstaat. Houdt de volgorde van
 * `POPULAR_IDS` aan en vult aan met de overige presets als er minder
 * dan `limit` populaire diensten beschikbaar zijn.
 */
export function popularPresets(
  presets: Preset[] = PRESETS,
  limit = 8
): Preset[] {
  const ranked = POPULAR_IDS.map((id) => presets.find((p) => p.id === id)).filter(
    (p): p is Preset => Boolean(p)
  );
  const rest = presets.filter((p) => !POPULAR_IDS.includes(p.id));
  return [...ranked, ...rest].slice(0, limit);
}

export type { Preset, PresetPlan } from "@/lib/presets/types";
