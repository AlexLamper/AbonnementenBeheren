# AbonnementenBeheren

Een simpele tracker voor je abonnementen. Voeg al je diensten (Spotify, Netflix,
sportschool, verzekeringen, ...) toe op één plek en zie meteen wat je per maand
en per jaar kwijt bent. Geen verrassingen meer, gewoon overzicht.

Toevoegen gaat snel via presets: zoek een dienst, kies een pakket, klaar. Staat
een dienst er niet bij? Voeg 'm handmatig toe.

## Gratis en Premium

Gratis houd je tot 5 abonnementen bij (`FREE_SUBSCRIPTION_LIMIT`). Premium
geeft onbeperkt abonnementen en een CSV-export. Premium heeft twee bronnen op
één account: Stripe op de website (`premiumStripe`) en de App Store / Google
Play via RevenueCat in de app (`premiumStore`). De limiet wordt altijd op de
server gecontroleerd (`lib/premium.ts`).

Alles staat achter `PREMIUM_ENABLED=true`; zonder die variabele is de site
onbeperkt gratis zoals voorheen. Zie `.env.example` voor alle variabelen.

Stripe-webhook: `/api/stripe/webhook` met de events `checkout.session.completed`
en `customer.subscription.created/updated/deleted`. Zet in Stripe ook het
klantportaal aan (Settings → Billing → Customer portal).

## App

De Flutter-app staat in [`mobile/`](mobile/README.md). Een push naar `main`
die `mobile/` raakt, zet automatisch een nieuwe build op TestFlight. Vercel
slaat een deploy over als alleen `mobile/` is veranderd (`vercel.json`).

## Techniek

- Next.js (App Router) + TypeScript
- Tailwind CSS
- NextAuth (e-mail/wachtwoord + Google)
- MongoDB via Mongoose
- Stripe (web) en RevenueCat (app) voor Premium
- Flutter voor de iOS- en Android-app

## Aan de slag

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.
