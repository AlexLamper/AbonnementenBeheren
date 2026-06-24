// Redactionele content per dienst voor de openbare SEO-pagina's (/[slug]).
// Prijzen staan in de preset-data; hier alleen uitleg, verschillen en de
// officiële website. Tekst is informatief en kan na prijswijzigingen verouderen.

export interface PresetContent {
  /** Korte krachtzin onder de titel. */
  tagline: string;
  /** Uitleg: wat is de dienst en wat krijg je. */
  description: string;
  /** Verschil tussen de abonnementen/pakketten. */
  differences: string;
  /** Officiële website (geen affiliate). */
  website: string;
}

export const PRESET_CONTENT: Record<string, PresetContent> = {
  spotify: {
    tagline: "Muziekstreaming met miljoenen nummers en podcasts.",
    description:
      "Spotify is de bekendste muziekdienst van Nederland. Met Spotify Premium luister je advertentievrij, download je muziek voor offline gebruik en kies je zelf welk nummer je afspeelt. Een gratis variant met advertenties bestaat ook.",
    differences:
      "Individual is voor één persoon, Student is goedkoper met een geldige inschrijving, Duo is voor twee personen op één adres en Family voor maximaal zes personen.",
    website: "https://www.spotify.com/nl/",
  },
  netflix: {
    tagline: "Films en series streamen zonder kijklimiet.",
    description:
      "Netflix is de grootste streamingdienst voor films, series en eigen producties. Je kijkt op tv, laptop, tablet en telefoon en pakt altijd op waar je gebleven was.",
    differences:
      "Standaard met advertenties is het goedkoopst, Standaard kijkt advertentievrij in Full HD op 2 schermen, en Premium voegt 4K, HDR en 4 gelijktijdige schermen toe.",
    website: "https://www.netflix.com/nl/",
  },
  disneyplus: {
    tagline: "Disney, Pixar, Marvel, Star Wars en National Geographic.",
    description:
      "Disney+ bundelt de films en series van Disney, Pixar, Marvel, Star Wars en National Geographic, plus volwassener titels onder het label Star. Ideaal voor gezinnen.",
    differences:
      "Standaard met advertenties is voordelig, Standaard kijkt advertentievrij in Full HD, en Premium biedt 4K UHD, Dolby Atmos en downloads.",
    website: "https://www.disneyplus.com/nl-nl",
  },
  videoland: {
    tagline: "Nederlandse series, realityshows en films.",
    description:
      "Videoland is de Nederlandse streamingdienst van RTL met veel eigen series, realityprogramma's en films. Veel content verschijnt hier eerder dan op tv.",
    differences:
      "Basis bevat advertenties en 1 scherm, Plus is advertentievrij met meer schermen, en Premium voegt de hoogste kwaliteit en downloads toe.",
    website: "https://www.videoland.com/",
  },
  max: {
    tagline: "HBO-series, films en Warner Bros.-content.",
    description:
      "HBO Max (Max) biedt toegang tot HBO-series, Warner Bros.-films, DC, en exclusieve producties. Bekend van titels als House of the Dragon en The Last of Us.",
    differences:
      "Basic met advertenties is het goedkoopst, Standaard kijkt advertentievrij op 2 schermen in Full HD, en Premium biedt 4K, Dolby Atmos en 4 schermen.",
    website: "https://www.hbomax.com/nl/nl",
  },
  chatgpt: {
    tagline: "AI-assistent voor schrijven, code en analyse.",
    description:
      "ChatGPT van OpenAI is een AI-chatbot die helpt met tekst schrijven, vragen beantwoorden, programmeren en meer. Er is een gratis versie; betaalde abonnementen geven snellere en krachtigere modellen.",
    differences:
      "Plus geeft toegang tot de nieuwste modellen en hogere limieten, terwijl Pro de hoogste limieten en extra functies biedt voor intensief gebruik.",
    website: "https://chatgpt.com/",
  },
  microsoft365: {
    tagline: "Word, Excel, PowerPoint, Outlook en 1TB OneDrive.",
    description:
      "Microsoft 365 bundelt de Office-apps (Word, Excel, PowerPoint, Outlook) met 1 TB OneDrive-opslag en updates. Beschikbaar op pc, Mac, tablet en telefoon.",
    differences:
      "Personal is voor één persoon, Family voor maximaal zes personen. Een jaarabonnement is per maand goedkoper dan maandelijks betalen.",
    website: "https://www.microsoft.com/nl-nl/microsoft-365",
  },
  adobe: {
    tagline: "Photoshop, Illustrator en de hele Creative Cloud.",
    description:
      "Adobe Creative Cloud geeft toegang tot professionele creatieve software zoals Photoshop, Illustrator, Premiere Pro en Lightroom, inclusief cloudopslag en updates.",
    differences:
      "Een los app-abonnement (zoals Photoshop) is goedkoper; Alle apps geeft toegang tot het volledige pakket van meer dan 20 programma's.",
    website: "https://www.adobe.com/nl/creativecloud.html",
  },
  basicfit: {
    tagline: "Sporten bij heel veel vestigingen in Nederland.",
    description:
      "Basic-Fit is de grootste fitnessketen van Nederland met sportscholen door het hele land. Je traint met toestellen, vrije gewichten en groepslessen via de app.",
    differences:
      "Comfort is voor één club en één persoon, Premium voegt meenemen van een vriend en alle clubs toe, en Ultimate biedt de meeste extra's.",
    website: "https://www.basic-fit.com/nl-nl",
  },
  ziggo: {
    tagline: "Internet, tv en bellen via de kabel.",
    description:
      "Ziggo levert internet, televisie en bellen via het kabelnetwerk. Bekend om snelle downloadsnelheden en een uitgebreid tv-pakket met Ziggo GO.",
    differences:
      "Het Internet-pakket is alleen internet; Internet & TV voegt het televisiepakket en de tv-app toe.",
    website: "https://www.ziggo.nl/",
  },
  kpn: {
    tagline: "Glasvezel- en DSL-internet, tv en bellen.",
    description:
      "KPN biedt internet via glasvezel of DSL, plus interactieve tv en bellen. Bekend om een stabiel netwerk en landelijke dekking.",
    differences:
      "Internet is alleen de verbinding; Internet & TV voegt het tv-pakket met de KPN-app en zenders toe.",
    website: "https://www.kpn.com/",
  },
  odido: {
    tagline: "Mobiel en internet (voorheen T-Mobile).",
    description:
      "Odido (voorheen T-Mobile) levert mobiele abonnementen en thuisinternet. Bekend om onbeperkte databundels en goede 5G-dekking.",
    differences:
      "Het 5GB-abonnement is voor lichter gebruik; Unlimited geeft onbeperkt data voor wie veel onderweg streamt.",
    website: "https://www.odido.nl/",
  },
  amazonprime: {
    tagline: "Prime Video, snelle bezorging en meer.",
    description:
      "Amazon Prime combineert streaming (Prime Video) met voordelen zoals snellere bezorging bij Amazon. Eén lidmaatschap geeft toegang tot meerdere diensten.",
    differences:
      "Maandelijks betalen is flexibel; een jaarabonnement is per maand voordeliger.",
    website: "https://www.amazon.nl/amazonprime",
  },
  appletv: {
    tagline: "Exclusieve Apple Originals-series en films.",
    description:
      "Apple TV+ biedt exclusieve series en films van Apple, zoals Ted Lasso en Severance. Reclamevrij en in hoge kwaliteit op al je apparaten.",
    differences:
      "Apple TV+ heeft één abonnement; het kan ook onderdeel zijn van het Apple One-bundelabonnement.",
    website: "https://tv.apple.com/",
  },
  skyshowtime: {
    tagline: "Films en series van Universal, Paramount en meer.",
    description:
      "SkyShowtime bundelt content van Universal, Paramount, Sky Studios, Nickelodeon en meer. Een voordelige streamingdienst met films en series.",
    differences:
      "Standaard met advertenties is het goedkoopst; Standaard kijkt advertentievrij.",
    website: "https://www.skyshowtime.com/nl",
  },
  youtubepremium: {
    tagline: "YouTube zonder advertenties, plus YouTube Music.",
    description:
      "YouTube Premium haalt advertenties weg, laat video's op de achtergrond afspelen en geeft je YouTube Music erbij. Downloaden voor offline kijken kan ook.",
    differences:
      "Student is het goedkoopst met inschrijving, Individueel voor één persoon, en Gezin voor maximaal zes huisgenoten.",
    website: "https://www.youtube.com/premium",
  },
  viaplay: {
    tagline: "Sport, films en series in één dienst.",
    description:
      "Viaplay combineert films en series met live sport, waaronder voetbal, F1-gerelateerde content en meer. Sterk voor sportliefhebbers.",
    differences:
      "Film & Series is zonder de duurste sport; Totaal voegt het volledige sportaanbod toe.",
    website: "https://viaplay.nl/",
  },
  nlziet: {
    tagline: "Alle programma's van NPO, RTL en SBS.",
    description:
      "NLZIET bundelt de programma's van de Nederlandse zenders (NPO, RTL, SBS) in één app. Live tv en gemiste afleveringen terugkijken zonder kabel.",
    differences:
      "NLZIET heeft één abonnement met toegang tot het volledige aanbod.",
    website: "https://www.nlziet.nl/",
  },
  applemusic: {
    tagline: "Muziekstreaming in lossless en spatial audio.",
    description:
      "Apple Music biedt miljoenen nummers, lossless audio en Dolby Atmos. Goed geïntegreerd in het Apple-ecosysteem, maar ook op Android beschikbaar.",
    differences:
      "Student is het goedkoopst met inschrijving, Individueel voor één persoon, en Gezin voor maximaal zes personen.",
    website: "https://www.apple.com/nl/apple-music/",
  },
  youtubemusic: {
    tagline: "Muziek en clips van YouTube.",
    description:
      "YouTube Music geeft toegang tot officiële nummers, albums, remixes en live-uitvoeringen van YouTube. Inbegrepen bij YouTube Premium.",
    differences:
      "Individueel is voor één persoon; Gezin voor maximaal zes huisgenoten.",
    website: "https://music.youtube.com/",
  },
  tidal: {
    tagline: "Muziekstreaming met focus op geluidskwaliteit.",
    description:
      "Tidal richt zich op hoge geluidskwaliteit (HiFi) en betaalt artiesten relatief goed. Populair bij audiofielen.",
    differences:
      "Individueel is voor één persoon; Gezin voor meerdere personen op één adres.",
    website: "https://tidal.com/",
  },
  deezer: {
    tagline: "Muziekstreaming met slimme aanbevelingen.",
    description:
      "Deezer biedt miljoenen nummers, podcasts en de Flow-functie die muziek aanraadt op basis van je smaak. Beschikbaar op vrijwel elk apparaat.",
    differences:
      "Individueel is voor één persoon; Gezin voor maximaal zes profielen.",
    website: "https://www.deezer.com/nl/",
  },
  audible: {
    tagline: "Luisterboeken en audioseries.",
    description:
      "Audible is de luisterboekendienst van Amazon. Met een abonnement luister je naar duizenden boeken en exclusieve audioseries.",
    differences:
      "Audible heeft één abonnement waarmee je toegang krijgt tot de catalogus en tegoed voor titels.",
    website: "https://www.audible.nl/",
  },
  storytel: {
    tagline: "Onbeperkt luisterboeken en e-books.",
    description:
      "Storytel geeft onbeperkt toegang tot luisterboeken en e-books in het Nederlands en Engels. Lees of luister offline via de app.",
    differences:
      "Unlimited geeft onbeperkt luisteren voor één persoon; Premium voegt extra profielen of uren toe.",
    website: "https://www.storytel.com/nl",
  },
  googleone: {
    tagline: "Extra opslag voor Google-foto's, Drive en Gmail.",
    description:
      "Google One breidt je opslag uit voor Google Drive, Gmail en Google Foto's, met extra voordelen zoals back-ups en in hogere abonnementen AI-functies.",
    differences:
      "Hoe meer opslag, hoe hoger de prijs: 100GB, 200GB of 2TB. Grotere pakketten bevatten meer extra's.",
    website: "https://one.google.com/",
  },
  icloud: {
    tagline: "Extra iCloud-opslag voor je Apple-apparaten.",
    description:
      "iCloud+ breidt je Apple-opslag uit voor foto's, back-ups en bestanden, met privacyfuncties zoals Private Relay en Hide My Email.",
    differences:
      "Kies tussen 50GB, 200GB of 2TB; meer opslag kost meer en kan met het gezin gedeeld worden.",
    website: "https://www.apple.com/nl/icloud/",
  },
  dropbox: {
    tagline: "Cloudopslag en bestanden delen.",
    description:
      "Dropbox is cloudopslag om bestanden te bewaren, synchroniseren en delen tussen apparaten en met anderen. Geschikt voor privé en werk.",
    differences:
      "Plus biedt 2TB voor één gebruiker; Essentials voegt meer opslag en tools toe voor professionals.",
    website: "https://www.dropbox.com/",
  },
  canva: {
    tagline: "Online ontwerptool voor van alles.",
    description:
      "Canva is een eenvoudige ontwerptool voor social media, presentaties, posters en meer. Pro voegt premium-templates, merksets en achtergrond verwijderen toe.",
    differences:
      "Maandelijks betalen is flexibel; een jaarabonnement is per maand voordeliger.",
    website: "https://www.canva.com/nl_nl/",
  },
  nordvpn: {
    tagline: "VPN voor privacy en veilig internetten.",
    description:
      "NordVPN versleutelt je internetverkeer en verbergt je IP-adres. Handig op openbare wifi en om je privacy online te beschermen.",
    differences:
      "Een maandabonnement is flexibel; langere abonnementen (1 of 2 jaar) zijn per maand veel goedkoper.",
    website: "https://nordvpn.com/nl/",
  },
  playstationplus: {
    tagline: "Online gamen en een groeiende gamecatalogus.",
    description:
      "PlayStation Plus geeft toegang tot online multiplayer, maandelijkse gratis games en, in hogere pakketten, een grote catalogus aan games.",
    differences:
      "Essential biedt online gamen en maandgames, Extra voegt een gamecatalogus toe, en Premium voegt klassiekers en proefversies toe.",
    website: "https://www.playstation.com/nl-nl/ps-plus/",
  },
  xboxgamepass: {
    tagline: "Honderden games voor één vast bedrag.",
    description:
      "Xbox Game Pass geeft toegang tot honderden games op console en pc. Ultimate bevat ook online gamen en cloud gaming.",
    differences:
      "Core is online gamen met een kleinere selectie, PC Game Pass is voor de pc, en Ultimate combineert alles inclusief cloud gaming.",
    website: "https://www.xbox.com/nl-NL/xbox-game-pass",
  },
  nintendoswitchonline: {
    tagline: "Online spelen op de Nintendo Switch.",
    description:
      "Nintendo Switch Online maakt online spelen mogelijk en geeft toegang tot klassieke games (NES, SNES en meer) plus cloudopslag.",
    differences:
      "Individueel is voor één account; Gezin geldt voor maximaal acht accounts en is per persoon voordeliger.",
    website: "https://www.nintendo.nl/Nintendo-Switch-Online/",
  },
  strava: {
    tagline: "Hardlopen en fietsen volgen en analyseren.",
    description:
      "Strava registreert je hardloop- en fietstrainingen en geeft uitgebreide analyses, segmenten en sociale functies. Populair bij sporters.",
    differences:
      "Maandelijks betalen is flexibel; het jaarabonnement is per maand fors voordeliger.",
    website: "https://www.strava.com/",
  },
};

export function getPresetContent(id: string): PresetContent | undefined {
  return PRESET_CONTENT[id];
}
