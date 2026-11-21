import { IOS_APP_LIVE } from "@/lib/seo";

/** App Store-id van de iPhone-app (zelfde id als in IOS_APP_STORE_URL). */
const IOS_APP_ID = "6833970151";

/**
 * Staat de iPhone-app al in de Nederlandse App Store?
 *
 * Kijkt zelf bij Apple (iTunes lookup-API) en onthoudt het antwoord een uur.
 * Zodra Apple de app goedkeurt, verschijnt de downloadknop dus vanzelf,
 * zonder deploy of instelling. NEXT_PUBLIC_IOS_APP_LIVE=true forceert 'm
 * altijd aan. Lukt de check niet, dan geen knop (liever geen dan een dode).
 */
export async function isIosAppLive(): Promise<boolean> {
  if (IOS_APP_LIVE) return true;
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${IOS_APP_ID}&country=nl`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { resultCount?: number };
    return (data.resultCount ?? 0) > 0;
  } catch {
    return false;
  }
}
