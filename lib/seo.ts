// Centrale SEO-constanten. Gedeeld door layout, sitemap, robots, manifest en JSON-LD
// zodat alles dezelfde site-URL, naam en keywords gebruikt.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abonnementenbeheren.com"
).replace(/\/$/, "");

export const SITE_NAME = "AbonnementenBeheren";

export const AUTHOR = "Alex Lamper";

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
