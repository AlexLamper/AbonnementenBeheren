import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Hoe AbonnementenBeheren met je gegevens omgaat.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacyverklaring" updated="12 november 2026">
      <p>
        AbonnementenBeheren (website en app) is een product van AL Design,
        de eenmanszaak van Alex Lamper. We verzamelen zo min mogelijk
        gegevens en verkopen nooit iets door.
      </p>

      <h2>Welke gegevens we opslaan</h2>
      <ul>
        <li>Je naam en e-mailadres, om je account te herkennen.</li>
        <li>Je wachtwoord, alleen versleuteld (gehasht). Wij kunnen het niet lezen.</li>
        <li>
          De abonnementen die je zelf invoert: naam, pakket, prijs, periode,
          categorie en notities.
        </li>
        <li>
          Of je Premium hebt, en via welke weg (website of app). Betaalgegevens
          zelf, zoals je rekening- of kaartnummer, komen nooit bij ons.
        </li>
      </ul>

      <h2>Wie ons helpt</h2>
      <ul>
        <li>Vercel host de website en de servers.</li>
        <li>MongoDB slaat je account en abonnementen op.</li>
        <li>Stripe verwerkt betalingen op de website.</li>
        <li>
          Apple (App Store), Google (Google Play) en RevenueCat verwerken
          aankopen in de app.
        </li>
        <li>Google, als je ervoor kiest om met Google in te loggen.</li>
      </ul>

      <h2>Hoe lang we gegevens bewaren</h2>
      <p>
        Zolang je account bestaat. Verwijder je je account (in de app via
        Instellingen, of door ons te mailen), dan wissen we je account en al
        je abonnementen. Gegevens die we wettelijk moeten bewaren, zoals
        facturen, bewaren we zo lang als de wet vraagt.
      </p>

      <h2>Je rechten</h2>
      <p>
        Je mag je gegevens inzien, laten aanpassen of laten verwijderen. Mail
        daarvoor naar <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je
        een klacht indienen bij de Autoriteit Persoonsgegevens.
      </p>
    </LegalPage>
  );
}
