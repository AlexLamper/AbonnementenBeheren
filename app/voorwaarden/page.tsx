import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/seo";
import { FREE_SUBSCRIPTION_LIMIT } from "@/lib/premium";

export const metadata: Metadata = {
  title: "Voorwaarden",
  description: "De gebruiksvoorwaarden van AbonnementenBeheren en Premium.",
  alternates: { canonical: "/voorwaarden" },
};

export default function VoorwaardenPage() {
  return (
    <LegalPage title="Voorwaarden" updated="12 november 2026">
      <p>
        Deze voorwaarden gelden voor de website en de app van
        AbonnementenBeheren, een product van AL Design (Alex Lamper). Door een
        account aan te maken ga je ermee akkoord.
      </p>

      <h2>Wat AbonnementenBeheren doet</h2>
      <p>
        Je houdt je abonnementen bij en ziet wat je per maand en per jaar
        betaalt. De prijzen van diensten in onze lijst zijn een hulpmiddel; we
        doen ons best ze actueel te houden, maar de prijs die je dienst
        rekent, is altijd leidend.
      </p>

      <h2>Gratis en Premium</h2>
      <ul>
        <li>Met een gratis account houd je tot {FREE_SUBSCRIPTION_LIMIT} abonnementen bij.</li>
        <li>
          Premium is een abonnement per maand of per jaar dat de limiet
          weghaalt en extra functies geeft. De prijs staat bij het afrekenen.
        </li>
        <li>
          Premium verlengt automatisch tot je opzegt. Na opzeggen houd je
          Premium tot het einde van de periode waarvoor je betaald hebt.
        </li>
        <li>
          Op de website zeg je op via &quot;Abonnement beheren&quot; op de
          Premium-pagina. Gekocht in de app? Dan zeg je op in de
          abonnementsinstellingen van de App Store of Google Play. Daar
          gelden ook de voorwaarden van Apple of Google.
        </li>
        <li>
          Stop je met Premium, dan blijven al je abonnementen staan. Je kunt
          ze bekijken, aanpassen en verwijderen.
        </li>
      </ul>

      <h2>Je account</h2>
      <p>
        Houd je wachtwoord geheim. Je kunt je account op elk moment
        verwijderen. We mogen een account blokkeren als het wordt misbruikt.
      </p>

      <h2>Aansprakelijkheid</h2>
      <p>
        We doen ons best om AbonnementenBeheren goed en veilig te laten
        werken, maar kunnen niet garanderen dat het altijd foutloos werkt.
        We zijn niet aansprakelijk voor beslissingen die je neemt op basis van
        de getoonde bedragen.
      </p>

      <h2>Contact</h2>
      <p>
        Vragen? Mail naar <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
