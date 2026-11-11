import type { PresetContent } from "@/lib/presets/content";

export const LIFESTYLE_CONTENT: Record<string, PresetContent> = {
  // Mobiliteit
  nsflex: {
    tagline: "Treinabonnementen van NS die je achteraf per maand betaalt.",
    description:
      "Met NS Flex reis je op je persoonlijke OV-chipkaart zonder saldo en betaal je achteraf per maand. Je kiest een abonnement dat past bij hoe vaak en wanneer je met de trein reist, van korting in de daluren tot onbeperkt reizen.",
    differences:
      "Dal Voordeel geeft 40% korting in de daluren en in het weekend, Weekend Vrij laat je in het weekend en op feestdagen onbeperkt reizen, Dal Vrij geeft onbeperkt reizen in de daluren en Altijd Vrij onbeperkt reizen op elk moment. De prijzen gelden voor de 2e klas; voor 65-plussers zijn sommige abonnementen goedkoper.",
    website: "https://www.ns.nl/",
  },
  anwb: {
    tagline: "Pechhulp van de ANWB in Nederland en Europa.",
    description:
      "ANWB Wegenwacht is de pechhulp van de ANWB: sta je met pech, dan komt de Wegenwacht je helpen. Het ANWB-lidmaatschap zit bij de prijs van Wegenwacht inbegrepen.",
    differences:
      "Wegenwacht Nederland geldt alleen in Nederland, Wegenwacht Europa ook in de rest van Europa. Instap, Standaard en Compleet bepalen hoe uitgebreid de hulp is, en per jaar betalen is voordeliger dan per maand.",
    website: "https://www.anwb.nl/wegenwacht",
  },
  swapfiets: {
    tagline: "Een fiets of e-bike voor een vast bedrag per maand.",
    description:
      "Swapfiets is een fietsabonnement: je betaalt per maand en rijdt op een fiets met de bekende blauwe voorband. Is er iets kapot, dan regelt Swapfiets de reparatie of krijg je een vervangende fiets.",
    differences:
      "Original en Deluxe 7 zijn gewone stadsfietsen, waarbij de Deluxe 7 zeven versnellingen heeft. Power 1, Power 7 en Power Plus zijn e-bikes; prijzen kunnen per stad verschillen en studenten krijgen korting.",
    website: "https://swapfiets.nl/",
  },
  greenwheels: {
    tagline: "Autodelen met deelauto's op vaste plekken in de stad.",
    description:
      "Greenwheels is een autodeeldienst met deelauto's op vaste parkeerplekken in steden door heel Nederland. Je reserveert een auto via de app en betaalt per uur en per gereden kilometer.",
    differences:
      "Met Soms betaal je geen maandbedrag, maar wel hogere tarieven per uur en per kilometer. Regelmatig en Vaak kosten een vast bedrag per maand en geven lagere tarieven, wat voordelig is als je vaker een auto nodig hebt.",
    website: "https://www.greenwheels.nl/",
  },
  flitsmeister: {
    tagline: "Verkeersapp met meldingen van flitsers en files.",
    description:
      "Flitsmeister waarschuwt je onderweg voor flitsers, files en andere verkeerssituaties, op basis van meldingen van andere weggebruikers. De app is gratis te gebruiken; met PRO krijg je extra functies.",
    differences:
      "Er is één betaald abonnement, PRO, dat je per maand betaalt. Sinds oktober 2025 werkt een PRO-abonnement op één toestel tegelijk.",
    website: "https://www.flitsmeister.nl/",
  },
  teslaconnectivity: {
    tagline: "Live verkeer, satellietkaarten en streaming in je Tesla.",
    description:
      "Premium Connectivity is een abonnement voor Tesla-rijders dat de auto via mobiele data met internet verbindt. Daarmee krijg je onder meer live verkeersinformatie in de navigatie, satellietkaarten en het streamen van muziek en video in de auto.",
    differences:
      "Er is één abonnement, dat je per maand betaalt. De basisversie, Standaard Connectivity, is gratis maar biedt minder functies.",
    website: "https://www.tesla.com/nl_NL/support/connectivity",
  },
  easypark: {
    tagline: "Parkeren via de app, zonder parkeerautomaat.",
    description:
      "Met EasyPark start en stop je parkeeracties via je telefoon, zodat je alleen betaalt voor de tijd dat je echt parkeert. Zonder abonnement betaal je per parkeeractie servicekosten bovenop het parkeergeld.",
    differences:
      "Zonder abonnement betaal je een vast bedrag per parkeeractie plus 15% van je parkeerkosten. Met het abonnement betaal je een vast bedrag per maand en vervalt die extra toeslag.",
    website: "https://www.easypark.com/",
  },
  yellowbrick: {
    tagline: "Parkeren via je telefoon, onderdeel van EasyPark.",
    description:
      "Yellowbrick is een parkeerdienst waarmee je parkeeracties start en stopt via je telefoon, zodat je alleen betaalt voor de tijd dat je parkeert. Yellowbrick is onderdeel van EasyPark.",
    differences:
      "Zonder abonnement betaal je kosten per parkeeractie. Met Unlimited betaal je een vast bedrag per maand en geen kosten per parkeeractie.",
    website: "https://www.yellowbrick.nl/",
  },

  // Eten & Bezorging
  hellofresh: {
    tagline: "Maaltijdbox met recepten en verse ingrediënten aan huis.",
    description:
      "HelloFresh bezorgt elke week een box met afgewogen ingrediënten en recepten met stap-voor-stapuitleg. Je kiest zelf je gerechten uit het weekmenu en kunt weken overslaan of je abonnement pauzeren.",
    differences:
      "De prijs hangt af van het aantal maaltijden per week en het aantal personen; per portie wordt het goedkoper naarmate je box groter is. De bedragen zijn een indicatie en kunnen per week en door acties verschillen.",
    website: "https://www.hellofresh.nl/",
  },
  marleyspoon: {
    tagline: "Maaltijdbox met recepten en verse ingrediënten.",
    description:
      "Marley Spoon bezorgt een wekelijkse box met verse ingrediënten en recepten, zodat je zonder boodschappen te doen thuis kookt. Je kiest elke week je gerechten uit een wisselend menu.",
    differences:
      "De prijs hangt af van het aantal maaltijden per week en het aantal personen; grotere boxen zijn per portie goedkoper. De bedragen zijn een indicatie en kunnen per week en door acties verschillen.",
    website: "https://marleyspoon.nl/",
  },
  ekomenu: {
    tagline: "Nederlandse maaltijdbox met biologische ingrediënten.",
    description:
      "Ekomenu is een Nederlandse maaltijdbox met biologische ingrediënten en recepten om thuis te koken. Je kiest elke week je gerechten en ontvangt alles wat je nodig hebt aan huis.",
    differences:
      "De prijs hangt af van het aantal maaltijden per week en het aantal personen; grotere boxen zijn per portie goedkoper. De bedragen zijn een indicatie en kunnen per week verschillen.",
    website: "https://www.ekomenu.nl/",
  },
  uberone: {
    tagline: "Lidmaatschap met voordeel op Uber Eats en Uber-ritten.",
    description:
      "Uber One is het betaalde lidmaatschap van Uber. Leden betalen geen bezorgkosten op geschikte Uber Eats-bestellingen boven een minimumbedrag en krijgen extra voordeel op ritten.",
    differences:
      "Je betaalt per maand of per jaar; met een jaarlidmaatschap ben je per maand goedkoper uit.",
    website: "https://www.uber.com/nl/nl/",
  },
  ahpremium: {
    tagline: "Betaald lidmaatschap van Albert Heijn met extra voordeel.",
    description:
      "AH Premium is het betaalde lidmaatschap van Albert Heijn. Leden krijgen extra aanbiedingen en voordelen bovenop de gewone Bonus-acties.",
    differences:
      "Er is één Premium-lidmaatschap. Kijk op de website van Albert Heijn voor de actuele voordelen en voorwaarden.",
    website: "https://www.ah.nl/premium",
  },

  // Uitjes & Cultuur
  museumkaart: {
    tagline: "Een jaar lang gratis naar honderden musea.",
    description:
      "Met de Museumkaart bezoek je een jaar lang gratis honderden musea in Nederland, zo vaak als je wilt. Voor sommige tentoonstellingen geldt een kleine toeslag.",
    differences:
      "Er is een Museumkaart voor volwassenen en een goedkopere voor jongeren tot en met 18 jaar. Beide zijn een jaar geldig.",
    website: "https://www.museumkaart.nl/",
  },
  pathe: {
    tagline: "Onbeperkt naar de film in Pathé-bioscopen.",
    description:
      "Met Pathé Unlimited ga je voor een vast bedrag per maand zo vaak naar de film als je wilt in de Pathé-bioscopen in Nederland. Voor speciale zalen en formaten kan een toeslag gelden.",
    differences:
      "Met Unlimited ga je onbeperkt naar de film, maar betaal je voor speciale zalen en formaten soms een toeslag. Met Unlimited Gold betaal je die toeslagen niet. Beide betaal je per maand.",
    website: "https://www.pathe.nl/",
  },
  cjp: {
    tagline: "Kortingspas voor cultuur voor jongeren tot 30 jaar.",
    description:
      "Met de CJP-pas krijg je korting op theater, musea, festivals, film en andere culturele uitjes. De pas is bedoeld voor jongeren tot 30 jaar.",
    differences:
      "Er is één CJP-pas, die je per jaar betaalt.",
    website: "https://www.cjp.nl/",
  },
  efteling: {
    tagline: "Een jaar lang zo vaak je wilt naar de Efteling.",
    description:
      "Met een Efteling Abonnement bezoek je het attractiepark in Kaatsheuvel een jaar lang zo vaak als je wilt. Handig als je meerdere keren per jaar gaat.",
    differences:
      "Classic geeft 290 dagen per jaar toegang, Plus 340 dagen en Premium alle dagen. Je betaalt per maand (minimaal 12 maanden) of in één keer voor een jaar; jaarlijks betalen is iets voordeliger.",
    website: "https://www.efteling.com/nl",
  },
  natuurmonumenten: {
    tagline: "Lid worden en de Nederlandse natuur steunen.",
    description:
      "Natuurmonumenten beschermt en beheert natuurgebieden in heel Nederland. Als lid steun je dat werk met een vaste bijdrage.",
    differences:
      "Je kiest zelf hoeveel je bijdraagt. Het bedrag hier is het minimumbedrag per maand.",
    website: "https://www.natuurmonumenten.nl/",
  },
  staatsbosbeheer: {
    tagline: "Vriend worden en de natuur van Staatsbosbeheer steunen.",
    description:
      "Staatsbosbeheer beheert bossen, duinen, heide en andere natuurgebieden in Nederland. Als Vriend steun je dat werk met een vaste bijdrage.",
    differences:
      "Je kiest zelf hoeveel je bijdraagt. Het bedrag hier is een indicatie.",
    website: "https://www.staatsbosbeheer.nl/",
  },
  toverland: {
    tagline: "Een jaar lang zo vaak je wilt naar Toverland.",
    description:
      "Attractiepark Toverland in Sevenum (Limburg) heeft attracties en achtbanen voor jong en oud. Met een abonnement ga je een jaar lang zo vaak als je wilt.",
    differences:
      "Er zijn abonnementen voor volwassenen (vanaf 140 cm) en kinderen (90 tot 140 cm); voor 60-plussers en gasten met een beperking gelden lagere prijzen. Je betaalt per maand (minimaal 12 maanden) of in één keer voor een jaar.",
    website: "https://www.toverland.com/",
  },
  cineville: {
    tagline: "Onbeperkt naar de film in filmtheaters door heel Nederland.",
    description:
      "Met Cineville ga je voor een vast bedrag per maand zo vaak als je wilt naar de film in aangesloten filmtheaters en arthousebioscopen in Nederland. Je reserveert je kaartje via de app of bij de kassa.",
    differences:
      "Je betaalt per maand. Tot en met 29 jaar betaal je een lager tarief dan het gewone abonnement.",
    website: "https://www.cineville.nl/",
  },

  // Apps & Lifestyle
  duolingo: {
    tagline: "Talen leren met korte, speelse lessen.",
    description:
      "Duolingo is een populaire app om talen te leren met korte lessen die je elke dag kunt doen. De gratis versie bevat advertenties; met een betaald abonnement oefen je zonder advertenties en met onbeperkte hartjes.",
    differences:
      "Super is advertentievrij met onbeperkte hartjes en extra oefenfuncties. Max voegt AI-functies toe, zoals uitleg bij je antwoorden en gesprekken oefenen; jaarlijks betalen is voordeliger dan per maand.",
    website: "https://www.duolingo.com/",
  },
  babbel: {
    tagline: "Taalcursussen in een app, gericht op echte gesprekken.",
    description:
      "Babbel is een app om talen te leren met lessen die zijn opgebouwd rond praktische, alledaagse gesprekken. Je kunt kiezen uit onder meer Engels, Spaans, Frans, Duits en Italiaans.",
    differences:
      "Je betaalt per maand, per drie maanden of per jaar. Hoe langer de looptijd, hoe lager de prijs per maand.",
    website: "https://www.babbel.com/",
  },
  headspace: {
    tagline: "Meditatie en mindfulness in een app.",
    description:
      "Headspace helpt je met geleide meditaties, ademhalingsoefeningen en content om beter te slapen en stress te verminderen. Er zijn programma's voor beginners en voor ervaren mediteerders.",
    differences:
      "Je betaalt per maand of per jaar; het jaarabonnement is per maand flink goedkoper.",
    website: "https://www.headspace.com/",
  },
  calm: {
    tagline: "App voor meditatie, ontspanning en beter slapen.",
    description:
      "Calm biedt geleide meditaties, slaapverhalen, ademhalingsoefeningen en rustgevende muziek. Met Calm Premium krijg je toegang tot de volledige bibliotheek.",
    differences:
      "Je betaalt per maand of per jaar; het jaarabonnement is per maand flink goedkoper.",
    website: "https://www.calm.com/",
  },
  tinder: {
    tagline: "Datingapp met extra functies via Plus, Gold en Platinum.",
    description:
      "Tinder is een van de bekendste datingapps. Met een betaald abonnement krijg je extra functies, zoals onbeperkt liken en zien wie jou al geliket heeft.",
    differences:
      "Plus geeft onder meer onbeperkt liken, Gold laat je daarnaast zien wie jou al geliket heeft en met Platinum kun je een bericht meesturen voordat je een match hebt. De prijzen verschillen per leeftijd en kunnen afwijken.",
    website: "https://tinder.com/",
  },
  bumble: {
    tagline: "Datingapp met extra functies via Boost en Premium.",
    description:
      "Bumble is een datingapp waarin je profielen bekijkt en matcht met anderen. Met een betaald abonnement krijg je extra functies, zoals zien wie jou al geliket heeft.",
    differences:
      "Boost geeft extra opties zoals matches verlengen, Premium voegt onder meer toe dat je ziet wie jou al geliket heeft. De prijzen verschillen per leeftijd en kunnen afwijken.",
    website: "https://bumble.com/",
  },
  hinge: {
    tagline: "Datingapp die is ontworpen om verwijderd te worden.",
    description:
      "Hinge is een datingapp waarin je reageert op foto's en antwoorden in iemands profiel. Met een betaald abonnement krijg je extra functies, zoals onbeperkt liken en zien wie jou al geliket heeft.",
    differences:
      "Hinge+ geeft onder meer onbeperkt liken en laat zien wie jou geliket heeft. HingeX zorgt er daarnaast voor dat je likes sneller worden gezien; de prijzen verschillen per leeftijd en kunnen afwijken.",
    website: "https://hinge.co/",
  },
  linkedinpremium: {
    tagline: "Extra functies voor je carrière en netwerk op LinkedIn.",
    description:
      "LinkedIn Premium geeft je extra mogelijkheden op LinkedIn, zoals InMail-berichten sturen naar mensen buiten je netwerk en zien wie je profiel heeft bekeken.",
    differences:
      "Premium Career is gericht op werkzoekenden, Premium Business op netwerken en zakelijke groei. Met jaarlijks betalen ben je per maand goedkoper uit.",
    website: "https://premium.linkedin.com/",
  },
  xpremium: {
    tagline: "Extra functies en minder advertenties op X.",
    description:
      "X Premium is het betaalde abonnement van X (voorheen Twitter). Afhankelijk van het pakket krijg je onder meer een blauw vinkje, posts bewerken, langere posts en minder advertenties.",
    differences:
      "Basic geeft basisfuncties zoals posts bewerken, Premium voegt het blauwe vinkje en minder advertenties toe, en Premium+ is advertentievrij met de meeste extra's, zoals ruimere toegang tot Grok.",
    website: "https://x.com/",
  },
  snapchatplus: {
    tagline: "Exclusieve en vroege functies in Snapchat.",
    description:
      "Snapchat+ is een betaald abonnement dat je toegang geeft tot exclusieve, experimentele en vroege functies in Snapchat, zoals aangepaste app-iconen en een badge op je profiel.",
    differences:
      "Er is één Snapchat+-abonnement dat je per maand betaalt.",
    website: "https://www.snapchat.com/plus",
  },
  telegrampremium: {
    tagline: "Grotere uploads, snellere downloads en extra functies in Telegram.",
    description:
      "Telegram Premium is het betaalde abonnement van de berichtenapp Telegram. Je krijgt onder meer bestandsuploads tot 4 GB, snellere downloads, spraak-naar-tekst en extra stickers en emoji.",
    differences:
      "Je betaalt per maand of per jaar; met een jaarabonnement ben je goedkoper uit. De prijs kan verschillen per platform, bijvoorbeeld via de App Store of rechtstreeks.",
    website: "https://telegram.org/",
  },
};
