import { NextResponse } from "next/server";
import { getPresets } from "@/lib/presets/store";
import { POPULAR_IDS } from "@/lib/presets";
import { findBrandIcon } from "@/lib/brandIcons";

export const dynamic = "force-dynamic";

/**
 * Openbare presetcatalogus voor de app, inclusief merkicoon, zodat de app
 * exact dezelfde logo's laat zien als de website.
 */
export async function GET() {
  const presets = await getPresets();
  return NextResponse.json(
    {
      popular: POPULAR_IDS,
      presets: presets.map((p) => ({
        ...p,
        brand: findBrandIcon(p.id, p.name) ?? null,
      })),
    },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
