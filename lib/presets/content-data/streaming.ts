import type { PresetContent } from "@/lib/presets/content";

export const STREAMING_CONTENT: Record<string, PresetContent> = {
  npoplus: {
    tagline: "Publieke omroep kijken zonder reclame en met meer archief.",
    description:
      "NPO Plus is het betaalde abonnement op NPO Start, de streamingdienst van de Nederlandse publieke omroep. Je kijkt programma's zonder reclame, kunt sommige series al vooruitkijken en hebt toegang tot een groter archief.",
    differences:
      "Er is één abonnement dat je per maand betaalt en maandelijks opzegt. De gratis versie van NPO Start blijft beschikbaar, maar dan met reclame en een kleiner aanbod.",
    website: "https://www.npo.nl/start",
  },
  mubi: {
    tagline: "Zorgvuldig geselecteerde arthousefilms en klassiekers.",
    description:
      "MUBI is een streamingdienst voor filmliefhebbers met een selectie van arthouse, wereldcinema, klassiekers en eigen MUBI-releases. Je kijkt advertentievrij op tv, laptop, tablet en telefoon.",
    differences:
      "Je kiest tussen maandelijks betalen of een jaarabonnement met hetzelfde aanbod. Met een jaarabonnement betaal je omgerekend flink minder per maand.",
    website: "https://mubi.com/nl",
  },
  crunchyroll: {
    tagline: "Anime streamen, vaak kort na de uitzending in Japan.",
    description:
      "Crunchyroll is de grootste streamingdienst voor anime, met duizenden afleveringen en nieuwe seizoenen die vaak kort na de Japanse uitzending verschijnen. Met een betaald abonnement kijk je zonder advertenties en heb je toegang tot de volledige bibliotheek.",
    differences:
      "Fan geeft advertentievrij toegang tot de hele catalogus, terwijl Mega Fan daar offline kijken en streamen op 4 apparaten tegelijk aan toevoegt.",
    website: "https://www.crunchyroll.com/",
  },
  dazn: {
    tagline: "Sportstreaming met onder meer NFL Game Pass.",
    description:
      "DAZN is een internationale sportstreamingdienst. In Nederland kijk je via DAZN onder meer NFL Game Pass, met alle NFL-wedstrijden live en on demand.",
    differences:
      "Season Pro geeft toegang tot een volledig NFL-seizoen, terwijl Season Pro Ultimate daar onder meer Multiview, HDR en Dolby 5.1-surroundgeluid aan toevoegt.",
    website: "https://www.dazn.com/",
  },
  espn: {
    tagline: "Eredivisie en ander voetbal via je tv-aanbieder.",
    description:
      "ESPN zendt in Nederland het betaald voetbal uit op de zenders ESPN 1 tot en met 4. Je neemt ESPN niet los als streamingabonnement, maar als extra pakket bij je tv-aanbieder, meestal inclusief de ESPN Watch-app.",
    differences:
      "De prijs verschilt per aanbieder: bij Ziggo heet het pakket ESPN Premium, bij KPN, Odido, DELTA en Youfone ESPN Compleet. Bij sommige aanbieders zitten (een deel van) de ESPN-zenders al in het basispakket of krijg je ESPN Compleet gratis bij een combinatie-abonnement.",
    website: "https://www.espn.nl/",
  },
  ziggosport: {
    tagline: "Live Europees voetbal, tennis, golf en motorsport.",
    description:
      "Ziggo Sport Totaal is het betaalde sportpakket met zes extra sportzenders. Je kijkt onder meer LaLiga en Serie A, Wimbledon en ATP-toernooien, MotoGP en golf, en kunt tot 7 dagen terugkijken.",
    differences:
      "Bij Ziggo neem je Ziggo Sport Totaal als extra bij je tv-abonnement en zeg je het maandelijks op. Klanten van KPN met KPN TV+ kunnen het pakket ook afnemen, tegen een iets hogere prijs.",
    website: "https://www.ziggosport.nl/",
  },
  canalplus: {
    tagline: "Films, series en eigen producties van CANAL+.",
    description:
      "CANAL+ is een streamingdienst met films, series en eigen CANAL+ Originals, die je ook kunt downloaden. Naast het film- en seriepakket is er een variant met live tv-zenders.",
    differences:
      "Films & Series geeft toegang tot films en series zonder live tv, terwijl Start daar meer dan 45 tv-zenders aan toevoegt maar op 1 scherm tegelijk werkt. Beide abonnementen zijn reclamevrij en maandelijks opzegbaar.",
    website: "https://www.canalplus.nl/",
  },
  cinetree: {
    tagline: "Filmhuis- en arthousefilms thuis streamen.",
    description:
      "Cinetree is een filmstreamingdienst met een selectie van filmhuis-, arthouse- en klassieke films. Als abonnee kijk je het abonnementsaanbod onbeperkt en krijg je 30% korting op huurfilms.",
    differences:
      "Je betaalt per maand, per half jaar of per jaar voor hetzelfde aanbod. Hoe langer je vooruitbetaalt, hoe lager de prijs per maand.",
    website: "https://www.cinetree.nl/",
  },
  hayu: {
    tagline: "Realityseries streamen, vaak kort na uitzending in de VS.",
    description:
      "Hayu is een streamingdienst van NBCUniversal die volledig draait om reality-tv, met series als Keeping Up with the Kardashians en The Real Housewives. Nieuwe afleveringen verschijnen vaak kort na de Amerikaanse uitzending.",
    differences:
      "Er is één abonnement met toegang tot de volledige catalogus. Wie een half jaar of een jaar vooruitbetaalt, krijgt korting op de maandprijs.",
    website: "https://www.hayu.com/",
  },
  plex: {
    tagline: "Je eigen film- en seriecollectie overal streamen.",
    description:
      "Plex is een mediaserver waarmee je je eigen films, series en muziek vanaf je computer of NAS naar al je apparaten streamt. De gratis versie werkt in je thuisnetwerk; met een betaald abonnement kijk je ook onderweg en krijg je extra functies.",
    differences:
      "De Remote Watch Pass is bedoeld om je eigen media buiten het thuisnetwerk te bekijken, terwijl Plex Pass dat combineert met extra functies zoals downloaden, delen en het overslaan van intro's.",
    website: "https://www.plex.tv/",
  },
  f1tv: {
    tagline: "Alle Formule 1-sessies live, met onboardcamera's.",
    description:
      "F1 TV is de officiële streamingdienst van de Formule 1. Je kijkt alle trainingen, kwalificaties en races live, met onboardcamera's van de coureurs, teamradio en live timing.",
    differences:
      "Pro is maandelijks opzegbaar en geeft toegang tot alle live sessies, terwijl Premium daar onder meer 4K-beeld aan toevoegt. Premium kun je ook als voordeliger jaarabonnement afsluiten.",
    website: "https://f1tv.formula1.com/",
  },
  nebula: {
    tagline: "Video's van onafhankelijke makers, zonder advertenties.",
    description:
      "Nebula is een streamingplatform dat eigendom is van de makers zelf, met video's, documentaires en exclusieve producties van bekende YouTube-makers. Je kijkt zonder advertenties en vaak eerder dan op YouTube.",
    differences:
      "Er is één abonnement dat je per maand of per jaar betaalt. Via de kortingslink van een maker is het jaarabonnement vaak goedkoper.",
    website: "https://nebula.tv/",
  },
  curiositystream: {
    tagline: "Documentaires over wetenschap, natuur en geschiedenis.",
    description:
      "CuriosityStream is een streamingdienst vol documentaires en educatieve series over onder meer wetenschap, natuur, geschiedenis en technologie. Je kijkt advertentievrij op tv, computer en mobiel.",
    differences:
      "Je kiest tussen een maand- en een jaarabonnement met hetzelfde aanbod. Met een jaarabonnement betaal je omgerekend minder per maand.",
    website: "https://curiositystream.com/",
  },
  rakutenviki: {
    tagline: "Koreaanse drama's en andere Aziatische series met ondertiteling.",
    description:
      "Rakuten Viki is een streamingdienst gespecialiseerd in Aziatische series en films, vooral Koreaanse drama's, met ondertitels die deels door de community worden gemaakt. De basis is gratis met advertenties; met Viki Pass kijk je zonder reclame en krijg je toegang tot meer titels.",
    differences:
      "Viki Pass Standard is het betaalde abonnement dat je maandelijks betaalt. Daarnaast blijft de gratis versie met advertenties en een beperkter aanbod beschikbaar.",
    website: "https://www.viki.com/",
  },
  dropout: {
    tagline: "Comedy en improvisatie, zonder advertenties.",
    description:
      "Dropout is een onafhankelijke comedy-streamingdienst van de makers achter CollegeHumor, bekend van shows als Dimension 20, Game Changer en Make Some Noise. Je kijkt alle afleveringen advertentievrij op tv, computer en mobiel.",
    differences:
      "Je kiest tussen een maand- en een jaarabonnement met hetzelfde aanbod. Met een jaarabonnement betaal je omgerekend minder per maand.",
    website: "https://www.dropout.tv/",
  },
  cinemember: {
    tagline: "Filmhuisfilms en arthouse online kijken.",
    description:
      "CineMember is een streamingdienst voor filmliefhebbers met films uit het filmhuiscircuit, arthouse en klassiekers. Je kijkt online op tv, computer, tablet en telefoon.",
    differences:
      "Je betaalt per maand, per half jaar of per jaar voor hetzelfde aanbod. Hoe langer je vastlegt, hoe lager de prijs per maand.",
    website: "https://www.cinemember.nl/",
  },
};
