# AbonnementenBeheren

De simpelste en meest gebruiksvriendelijke abonnemententracker van Nederland.
Houd al je abonnementen op één plek bij en zie meteen je maandelijkse en
jaarlijkse kosten.

## Functies (v1)

- Registreren en inloggen (e-mail/wachtwoord + optioneel Google)
- Persoonlijk overzicht op één pagina
- Abonnementen toevoegen via **presets** (zoek "Spotify" → kies pakket → 1 klik)
- Eigen abonnement toevoegen wanneer een dienst niet bestaat
- Bewerken en verwijderen
- Totale kosten per maand én per jaar
- Deel-knop

## Techniek

- Next.js (App Router) + TypeScript
- Tailwind CSS
- NextAuth (Credentials + Google) met MongoDB-adapter
- MongoDB via Mongoose

## Aan de slag

1. Zorg dat MongoDB lokaal draait (bijv. via MongoDB Compass) op
   `mongodb://localhost:27017`.
2. Maak `.env.local` aan (kopieer `.env.example`). Er staat al een werkende
   `.env.local` klaar voor lokale ontwikkeling.
3. Installeer en start:

   ```bash
   npm install
   npm run dev
   ```

4. Open <http://localhost:3000>.

## Google-login inschakelen (optioneel)

1. Maak OAuth-credentials aan in de Google Cloud Console.
2. Redirect-URI: `http://localhost:3000/api/auth/callback/google`.
3. Vul `GOOGLE_CLIENT_ID` en `GOOGLE_CLIENT_SECRET` in `.env.local` en zet
   `NEXT_PUBLIC_GOOGLE_ENABLED=true`.

## Presets uitbreiden

Voeg een bestand toe in `lib/presets/data/` (kopieer een bestaand bestand) en
registreer het in `lib/presets/index.ts`. Elke preset heeft een `affiliateUrl`-
veld dat al klaarstaat voor later gebruik.

## Voorbereid voor later

- **Herinneringen**: velden (`nextRenewalDate`, `reminderEnabled`,
  `reminderDaysBefore`) zitten al in het `Subscription`-model.
- **Affiliate-links**: `affiliateUrl` staat in elke preset, nog niet getoond.
