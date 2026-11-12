// Centrale SEO-constanten. Gedeeld door layout, sitemap, robots, manifest en JSON-LD
// zodat alles dezelfde site-URL, naam en keywords gebruikt.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abonnementenbeheren.com"
).replace(/\/$/, "");

export const SITE_NAME = "AbonnementenBeheren";

export const AUTHOR = "Alex Lamper";

/** Contactadres op de privacy- en voorwaardenpagina. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@abonnementenbeheren.com";

/** App Store-pagina van de iPhone-app. */
export const IOS_APP_STORE_URL = "https://apps.apple.com/nl/app/id6833970151";

/**
 * Pas op true zetten (NEXT_PUBLIC_IOS_APP_LIVE) zodra Apple de app heeft
 * goedgekeurd; tot dan zou de App Store-link nergens heen gaan.
 */
export const IOS_APP_LIVE = process.env.NEXT_PUBLIC_IOS_APP_LIVE === "true";

export const SITE_TITLE =
  "Abonnementen beheren - gratis overzicht van al je abonnementen";

export const SITE_DESCRIPTION =
  "Abonnementen beheren doe je gratis met AbonnementenBeheren. Voeg in één klik diensten toe en zie direct wat je per maand en per jaar aan abonnementen kwijt bent.";

export const SITE_KEYWORDS = [
  "abonnementen beheren",
  "abonnement beheren",
  "abonnementen bijhouden",
  "abonnementen overzicht",
  "abonnementen app",
  "abonnementen beheren gratis",
  "abonnementen opzeggen",
  "maandelijkse kosten overzicht",
  "abonnementen kosten berekenen",
];
