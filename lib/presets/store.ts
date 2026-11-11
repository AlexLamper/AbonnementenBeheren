import { connectDB } from "@/lib/db";
import { Preset as PresetModel } from "@/lib/models/Preset";
import { PRESETS } from "@/lib/presets";
import type { Preset } from "@/lib/presets/types";

/**
 * Haalt de presetcatalogus op. Presets uit MongoDB gaan voor (zo kun je
 * een prijs in de database aanpassen), en de statische `PRESETS` vullen
 * alles aan wat (nog) niet in de database staat. Zo verschijnen nieuwe
 * diensten uit `data/` direct na een deploy, ook als de database al
 * gevuld is. Bij een lege of onbereikbare database: alleen `PRESETS`.
 */
export async function getPresets(): Promise<Preset[]> {
  try {
    await connectDB();
    const docs = await PresetModel.find().lean<Preset[]>();
    if (!docs.length) return PRESETS;

    const merged = new Map<string, Preset>(PRESETS.map((p) => [p.id, p]));
    for (const d of docs) {
      merged.set(d.id, {
        id: d.id,
        name: d.name,
        category: d.category,
        logoUrl: d.logoUrl,
        color: d.color,
        affiliateUrl: d.affiliateUrl,
        plans: (d.plans ?? []).map((p) => ({
          name: p.name,
          price: p.price,
          billingPeriod: p.billingPeriod,
        })),
      });
    }
    return [...merged.values()].sort((a, b) => a.name.localeCompare(b.name, "nl"));
  } catch {
    return PRESETS;
  }
}
