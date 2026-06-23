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
].sort((a, b) => a.name.localeCompare(b.name, "nl"));

/** Case-insensitieve zoekfunctie op dienstnaam en categorie. */
export function searchPresets(query: string): Preset[] {
  const q = query.trim().toLowerCase();
  if (!q) return PRESETS;
  return PRESETS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function getPreset(id: string): Preset | undefined {
  return PRESETS.find((p) => p.id === id);
}

export type { Preset, PresetPlan } from "@/lib/presets/types";
