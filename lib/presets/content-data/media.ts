import type { PresetContent } from "@/lib/presets/content";

export const MEDIA_CONTENT: Record<string, PresetContent> = {
  // Muziek
  soundcloud: {
    tagline: "Muziekplatform met tracks van grote namen en onafhankelijke makers.",
    description:
      "SoundCloud is een muziekplatform waar zowel bekende artiesten als onafhankelijke makers hun muziek, mixen en remixes delen. Met een betaald abonnement luister je zonder advertenties en sla je nummers op om offline te luisteren.",
    differences:
      "Go is advertentievrij en laat je offline luisteren, maar mist een deel van de catalogus. Go+ geeft toegang tot de volledige catalogus en speelt alle nummers helemaal af in plaats van alleen fragmenten.",
    website: "https://soundcloud.com/",
  },
  amazonmusic: {
    tagline: "Muziekstreaming van Amazon met korting voor Prime-leden.",
    description:
      "Amazon Music Unlimited is de volledige muziekdienst van Amazon met een grote catalogus, playlists en podcasts. Je luistert zonder advertenties, kunt muziek downloaden en veel nummers zijn beschikbaar in HD en Ultra HD.",
    differences:
      "Individueel is voor één persoon; heb je Amazon Prime, dan betaal je per maand minder. Family is voor maximaal zes gebruikers, elk met een eigen account.",
    website: "https://www.amazon.nl/music/unlimited",
  },
  qobuz: {
    tagline: "Hi-res muziekstreaming voor wie geluidskwaliteit belangrijk vindt.",
    description:
      "Qobuz is een Franse muziekdienst die draait om geluidskwaliteit: je streamt in cd-kwaliteit en in hi-res tot 24-bit/192 kHz. Daarnaast vind je er redactionele artikelen en een winkel waar je albums kunt kopen.",
    differences:
      "Studio Solo is voor één persoon, Studio Duo voor twee accounts en Studio Family voor maximaal zes accounts. Met jaarlijks betalen ben je goedkoper uit, en studenten krijgen een flinke korting.",
    website: "https://www.qobuz.com/nl-nl/",
  },
  podimo: {
    tagline: "Exclusieve podcasts en luisterboeken in één app.",
    description:
      "Podimo is een dienst voor podcasts en luisterboeken met veel exclusieve Nederlandstalige podcasts die je niet in andere apps vindt. Gewone gratis podcasts luister je in dezelfde app.",
    differences:
      "Premium geeft toegang tot alle exclusieve podcasts en 20 uur luisterboeken per maand. Premium Plus heeft dezelfde podcasts, maar met onbeperkt luisterboeken.",
    website: "https://podimo.com/nl",
  },

  // Boeken
  koboplus: {
    tagline: "Onbeperkt e-books en luisterboeken voor een vast bedrag.",
    description:
      "Kobo Plus is het leesabonnement van Rakuten Kobo, in Nederland onder meer verkrijgbaar via bol. Je leest en luistert onbeperkt uit een grote collectie Nederlandstalige en Engelstalige titels op je Kobo e-reader of in de Kobo-app.",
    differences:
      "Lezen geeft onbeperkt toegang tot e-books en Luisteren tot luisterboeken. Lezen & Luisteren combineert beide voor een iets hoger bedrag.",
    website: "https://www.kobo.com/nl/nl",
  },
  bookbeat: {
    tagline: "Luisterboeken en e-books met een abonnement op uren.",
    description:
      "BookBeat is een Zweedse dienst voor luisterboeken en e-books met een grote Nederlandstalige collectie. Je kiest een abonnement met een aantal lees- en luisteruren per maand en hebt toegang tot de volledige catalogus.",
    differences:
      "Basic geeft 20 uur per maand en Premium 100 uur per maand. Studenten krijgen korting op Basic, en je kunt tegen betaling extra profielen toevoegen voor gezinsleden.",
    website: "https://www.bookbeat.com/nl",
  },
  kindleunlimited: {
    tagline: "Onbeperkt lenen uit de Kindle-bibliotheek van Amazon.",
    description:
      "Kindle Unlimited is het leesabonnement van Amazon waarmee je e-books leent uit een collectie van meer dan een miljoen titels. Je leest op een Kindle e-reader of in de gratis Kindle-app; het aanbod is vooral Engelstalig.",
    differences:
      "Er is één abonnement voor een vast bedrag per maand. Je kunt maximaal 20 titels tegelijk lenen en wisselt ze zo vaak als je wilt.",
    website: "https://www.amazon.nl/kindle-dbs/hz/subscribe/ku",
  },
  everand: {
    tagline: "E-books, luisterboeken en tijdschriften in één abonnement.",
    description:
      "Everand is de leesdienst die is voortgekomen uit Scribd en biedt e-books, luisterboeken, tijdschriften en podcasts. Het aanbod is grotendeels Engelstalig en je leest of luistert via de app of de website.",
    differences:
      "Everand werkt met één maandabonnement voor de hele catalogus. Voor een deel van de populaire titels geldt een maandelijks maximum.",
    website: "https://www.everand.com/",
  },
  blinkist: {
    tagline: "De kernideeën uit non-fictieboeken in een kwartier.",
    description:
      "Blinkist vat populaire non-fictieboeken samen in korte teksten en audio, zodat je de belangrijkste inzichten in ongeveer 15 minuten leest of beluistert. Het aanbod bestaat uit duizenden titels over onder meer zelfontwikkeling, ondernemen en psychologie.",
    differences:
      "Premium geeft volledige toegang tot alle samenvattingen en audio. Bij jaarlijks betalen ben je per maand een stuk goedkoper uit dan met een maandabonnement.",
    website: "https://www.blinkist.com/",
  },
  bookchoice: {
    tagline: "Elke maand een selectie e-books en luisterboeken.",
    description:
      "Bookchoice (voorheen Elly's Choice) is een leesdienst die elke maand een selectie van acht titels aanbiedt als e-book en luisterboek. Elke maandselectie blijft een jaar lang beschikbaar in de Bookchoice-app.",
    differences:
      "Via de website neem je een lidmaatschap dat automatisch wordt verlengd. Daarnaast kun je met een code losse maandselecties activeren, bijvoorbeeld als cadeau.",
    website: "https://www.bookchoice.com/",
  },

  // Nieuws & Tijdschriften
  nrc: {
    tagline: "Kwaliteitskrant met achtergronden en onderzoeksjournalistiek.",
    description:
      "NRC is een landelijke dagkrant die bekendstaat om achtergrondverhalen, onderzoeksjournalistiek en opinie. Met een digitaal abonnement lees je alle artikelen op nrc.nl en in de app, inclusief de digitale krant.",
    differences:
      "Het digitale abonnement geeft toegang tot de website, de app en de digitale krant. Wil je ook de papieren krant, dan kies je een combinatie van papier en digitaal tegen een hoger bedrag.",
    website: "https://www.nrc.nl/",
  },
  volkskrant: {
    tagline: "Landelijke dagkrant met nieuws, achtergronden en cultuur.",
    description:
      "de Volkskrant is een landelijke dagkrant van DPG Media met nieuws, analyses, opinie en uitgebreide aandacht voor cultuur en wetenschap. Met een digitaal abonnement lees je alle artikelen op de website en in de app, inclusief de digitale krant.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.volkskrant.nl/",
  },
  algemeendagblad: {
    tagline: "Landelijk en regionaal nieuws, sport en service in één krant.",
    description:
      "Het AD (Algemeen Dagblad) is een landelijke dagkrant van DPG Media met veel aandacht voor nieuws, sport en regionaal nieuws via de regionale edities. Met een digitaal abonnement lees je alle artikelen op ad.nl en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.ad.nl/",
  },
  telegraaf: {
    tagline: "Landelijke dagkrant met nieuws, sport, financiën en entertainment.",
    description:
      "De Telegraaf is een landelijke dagkrant van Mediahuis met nieuws, sport, financieel nieuws en entertainment. Met een digitaal abonnement lees je alle afgeschermde artikelen op telegraaf.nl en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Wie ook de papieren krant wil ontvangen, kiest een abonnement met papier tegen een hoger bedrag.",
    website: "https://www.telegraaf.nl/",
  },
  trouw: {
    tagline: "Landelijke dagkrant met aandacht voor zingeving en duurzaamheid.",
    description:
      "Trouw is een landelijke dagkrant van DPG Media met nieuws en achtergronden, en met veel aandacht voor religie, filosofie en duurzaamheid. Met een digitaal abonnement lees je alle artikelen op de website en in de app, inclusief de digitale krant.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.trouw.nl/",
  },
  parool: {
    tagline: "De krant van Amsterdam.",
    description:
      "Het Parool is de Amsterdamse dagkrant van DPG Media met nieuws uit de stad, landelijk nieuws, cultuur en uitgaan. Met een digitaal abonnement lees je alle artikelen op parool.nl en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.parool.nl/",
  },
  fd: {
    tagline: "Financieel en economisch nieuws voor professionals.",
    description:
      "Het Financieele Dagblad (FD) is de Nederlandse krant voor financieel en economisch nieuws, gericht op ondernemers, beleggers en professionals. Met een digitaal abonnement lees je alle artikelen op fd.nl, in de app en in de digitale krant.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Een abonnement met de papieren krant is duurder; voor zakelijke lezers zijn er ook teamabonnementen.",
    website: "https://fd.nl/",
  },
  decorrespondent: {
    tagline: "Advertentievrije journalistiek, betaald door leden.",
    description:
      "De Correspondent is een online journalistiek platform zonder advertenties dat wordt gefinancierd door leden. Het richt zich niet op het nieuws van de dag, maar op achtergronden en de onderliggende verbanden.",
    differences:
      "Je wordt lid en bepaalt binnen bepaalde grenzen zelf hoeveel je betaalt, per maand of per jaar. De bedragen hier zijn een indicatie; pas ze aan naar je eigen bijdrage.",
    website: "https://decorrespondent.nl/",
  },
  pzc: {
    tagline: "Het nieuws uit Zeeland.",
    description:
      "De PZC (Provinciale Zeeuwse Courant) is de regionale dagkrant van Zeeland, uitgegeven door DPG Media. Met een digitaal abonnement lees je het nieuws uit jouw regio en het landelijke nieuws op pzc.nl en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.pzc.nl/",
  },
  gelderlander: {
    tagline: "Regionaal en landelijk nieuws uit Gelderland.",
    description:
      "De Gelderlander is de regionale dagkrant voor grote delen van Gelderland en omgeving, uitgegeven door DPG Media. Met een digitaal abonnement lees je het nieuws uit jouw regio en het landelijke nieuws op gelderlander.nl en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.gelderlander.nl/",
  },
  tubantia: {
    tagline: "Regionaal en landelijk nieuws uit Twente en omgeving.",
    description:
      "Tubantia is de regionale dagkrant voor Twente en omgeving, uitgegeven door DPG Media. Met een digitaal abonnement lees je het nieuws uit jouw regio en het landelijke nieuws op tubantia.nl en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.tubantia.nl/",
  },
  brabantsdagblad: {
    tagline: "Regionaal en landelijk nieuws uit Brabant.",
    description:
      "Het Brabants Dagblad is de regionale dagkrant voor onder meer de regio's rond 's-Hertogenbosch, Tilburg en Oss, uitgegeven door DPG Media. Met een digitaal abonnement lees je het nieuws uit jouw regio en het landelijke nieuws op bd.nl en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot alle artikelen online en in de app. Daarnaast zijn er abonnementen met de papieren krant, bijvoorbeeld alleen in het weekend of de hele week.",
    website: "https://www.bd.nl/",
  },
  nytimes: {
    tagline: "Internationaal nieuws en onderzoeksjournalistiek uit New York.",
    description:
      "The New York Times is een van de bekendste kranten ter wereld, met internationaal nieuws, onderzoeksjournalistiek en opinie. Met een digitaal abonnement lees je onbeperkt artikelen op nytimes.com en in de app.",
    differences:
      "Basic Digital geeft toegang tot het nieuws, terwijl All Access ook Games, Cooking, The Athletic en Wirecutter bevat. Let op: de krant rekent af per vier weken en werkt vaak met een lagere introductieprijs.",
    website: "https://www.nytimes.com/",
  },
  economist: {
    tagline: "Brits weekblad over wereldpolitiek, economie en technologie.",
    description:
      "The Economist is een Brits weekblad met analyses over internationale politiek, economie, wetenschap en technologie. Met een digitaal abonnement lees je alle artikelen op de website en in de app en luister je naar de audio-editie van elk nummer.",
    differences:
      "Digital geeft toegang tot alle artikelen en de audio-editie; bij jaarlijks betalen ben je per maand goedkoper uit. Er is ook een abonnement inclusief de gedrukte editie.",
    website: "https://www.economist.com/",
  },
  readly: {
    tagline: "Onbeperkt tijdschriften en kranten lezen in één app.",
    description:
      "Readly is een tijdschriftenflatrate: voor een vast bedrag per maand lees je onbeperkt duizenden tijdschriften en kranten in één app. Het aanbod bestaat uit Nederlandse en internationale titels.",
    differences:
      "Readly heeft één abonnement waarmee je alle titels kunt lezen. Je kunt het account met gezinsleden delen via meerdere profielen.",
    website: "https://www.readly.com/",
  },
  ew: {
    tagline: "Opinieweekblad over politiek, economie en maatschappij.",
    description:
      "EW (voorheen Elsevier Weekblad) is een Nederlands opinieweekblad met achtergronden en columns over politiek, economie en maatschappij. Met een digitaal abonnement lees je het magazine en alle artikelen op de website en in de app.",
    differences:
      "Het digitale abonnement geeft toegang tot het magazine en de artikelen online en in de app. Wie het blad ook op papier wil ontvangen, kiest een abonnement met de gedrukte editie.",
    website: "https://www.ewmagazine.nl/",
  },
  donaldduck: {
    tagline: "Het bekende stripweekblad, elke week in de bus.",
    description:
      "Donald Duck is het bekende Nederlandse stripweekblad met verhalen over Donald, Dagobert, Mickey en andere Disney-figuren. Met een abonnement krijg je elke week het nieuwe nummer thuisbezorgd.",
    differences:
      "Het abonnement wordt per periode afgerekend, bijvoorbeeld per kwartaal of per jaar. Nieuwe abonnees kunnen vaak eerst een voordelige proefperiode nemen.",
    website: "https://www.donaldduck.nl/",
  },
};
