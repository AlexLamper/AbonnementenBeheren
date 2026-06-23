import { connectDB } from "@/lib/db";
import { Preset as PresetModel } from "@/lib/models/Preset";
import { PRESETS } from "@/lib/presets";
import type { Preset } from "@/lib/presets/types";

/**
 * Haalt de presetcatalogus uit MongoDB. Valt terug op de statische
 * `PRESETS` wanneer de database leeg of onbereikbaar is, zodat de
 * "Abonnement toevoegen"-flow altijd blijft werken.
 */
export async function getPresets(): Promise<Preset[]> {
  try {
    await connectDB();
    const docs = await PresetModel.find().lean<Preset[]>();
    if (!docs.length) return PRESETS;
    return docs
      .map((d) => ({
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
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "nl"));
  } catch {
    return PRESETS;
  }
}
