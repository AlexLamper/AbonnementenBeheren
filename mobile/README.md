# AbonnementenBeheren - app

Flutter-app (iOS + Android) met dezelfde kleuren, lettertypes en schermen als
abonnementenbeheren.com. De website is ook de API: inloggen, abonnementen,
presets en Premium lopen via dezelfde endpoints.

- Talen: Nederlands, Engels, Duits, Frans en Spaans (`lib/l10n/*.arb`).
  Standaard de taal van de telefoon; te wijzigen in Instellingen.
- Premium via RevenueCat (App Store / Google Play). Wie op de website betaalt,
  heeft ook in de app Premium, en andersom.
- Bundle ID: `com.abonnementenbeheren.app`

## Lokaal draaien

```bash
cd mobile
flutter pub get
flutter run --dart-define=API_BASE_URL=http://localhost:3000 \
            --dart-define=REVENUECAT_APPLE_KEY=appl_xxx
```

Zonder `API_BASE_URL` praat de app met de live site. Zonder RevenueCat-key
werkt alles behalve kopen.

Tests en schermafbeeldingen:

```bash
flutter test                                  # unit- en widgettests
flutter test screenshots --update-goldens     # PNG's in screenshots/goldens/
```

## TestFlight (push naar main)

`.github/workflows/ios-testflight.yml` bouwt bij elke push naar `main` die
`mobile/` raakt een nieuwe build en zet die op TestFlight, net als bij
BijbelQuiz. Zolang de secrets hieronder ontbreken, wordt de build netjes
overgeslagen.

GitHub → Settings → Secrets and variables → Actions:

| Secret | Wat |
| --- | --- |
| `APP_STORE_CONNECT_KEY_ID` | Key ID van een App Store Connect API-sleutel met rol **Admin** (`U6N9Y3JR93`) |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID (Users and Access → Integrations) |
| `APP_STORE_CONNECT_API_KEY_P8` | inhoud van `AuthKey_<id>.p8`, als tekst of base64 |
| `REVENUECAT_APPLE_KEY` | optioneel - de publieke sleutel staat al in `lib/core/config.dart` |

Ondertekenen gaat automatisch via die API-sleutel (`-allowProvisioningUpdates`):
Apple maakt zelf het distributiecertificaat en het App Store-profiel. Er is
dus geen `.p12` of `.mobileprovision` nodig.

## Eenmalig in Apple / RevenueCat

1. **Apple Developer** → Identifiers: maak App ID `com.abonnementenbeheren.app`
   (In-App Purchase staat standaard aan). Maak daarna een App Store
   provisioning profile en zet het als secret.
2. **App Store Connect**: nieuwe app met die bundle ID. Maak een
   abonnementsgroep "Premium" met twee abonnementen, bijvoorbeeld
   `abonnementenbeheren_premium_monthly` en `abonnementenbeheren_premium_yearly`.
   Vul de privacy-URL in: `https://www.abonnementenbeheren.com/privacy`.
3. **RevenueCat**: nieuw project, koppel de App Store-app, maak entitlement
   **`premium`** en koppel beide producten. Maak een offering (default) met
   een `$rc_monthly`- en `$rc_annual`-pakket.
   - Webhook: `https://www.abonnementenbeheren.com/api/mobile/revenuecat-webhook`
     met een eigen Authorization-header (zelfde waarde in Vercel als
     `REVENUECAT_WEBHOOK_AUTHORIZATION`).
   - Secret API key (`sk_...`) in Vercel als `REVENUECAT_REST_API_KEY`.
