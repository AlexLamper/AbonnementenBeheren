import type { PresetContent } from "@/lib/presets/content";

export const SOFTWARE_CONTENT: Record<string, PresetContent> = {
  "1password": {
    tagline: "Wachtwoordmanager voor jezelf of het hele gezin.",
    description:
      "1Password bewaart je wachtwoorden, passkeys, betaalkaarten en notities versleuteld in een kluis die je op al je apparaten gebruikt. Via de app en de browserextensie vul je inloggegevens automatisch in.",
    differences:
      "Individual is voor één persoon, Families deelt de kluizen met maximaal vijf gezinsleden. Jaarlijks betalen is voordeliger dan per maand.",
    website: "https://1password.com/",
  },
  bitwarden: {
    tagline: "Open-source wachtwoordmanager met een sterke gratis versie.",
    description:
      "Bitwarden is een open-source wachtwoordmanager die je wachtwoorden versleuteld opslaat en synchroniseert tussen al je apparaten. De gratis versie is al uitgebreid; Premium voegt onder meer een ingebouwde authenticator voor tweestapscodes en versleutelde bestandsopslag toe.",
    differences:
      "Premium is voor één gebruiker, Families geeft tot zes gebruikers de Premium-functies plus gedeelde collecties. Beide worden per jaar gefactureerd.",
    website: "https://bitwarden.com/",
  },
  dashlane: {
    tagline: "Wachtwoordmanager met automatisch invullen en datalekwaarschuwingen.",
    description:
      "Dashlane bewaart je wachtwoorden, passkeys en betaalgegevens en vult ze automatisch in op al je apparaten. Premium waarschuwt je ook als je gegevens opduiken bij een datalek.",
    differences:
      "Premium is voor één persoon, Friends & Family geeft tot tien mensen een eigen Premium-account onder één abonnement.",
    website: "https://www.dashlane.com/",
  },
  proton: {
    tagline: "Privacyvriendelijke mail, VPN, wachtwoorden en opslag uit Zwitserland.",
    description:
      "Proton biedt versleutelde diensten zoals Proton Mail, Proton VPN, Proton Pass en Proton Drive en is gevestigd in Zwitserland. Je neemt één dienst los of bundelt alles in Proton Unlimited.",
    differences:
      "Mail Plus, VPN Plus en Pass Plus ontgrendelen telkens één dienst, terwijl Unlimited de betaalde functies van Mail, Calendar, Drive, VPN en Pass combineert. Jaarlijks betalen is per maand flink goedkoper dan maandelijks.",
    website: "https://proton.me/",
  },
  surfshark: {
    tagline: "VPN voor een onbeperkt aantal apparaten.",
    description:
      "Surfshark is een VPN-dienst die je verbinding versleutelt en je IP-adres verbergt, zonder limiet op het aantal apparaten. Hogere pakketten voegen extra beveiliging toe, zoals antivirus en waarschuwingen bij datalekken.",
    differences:
      "Starter is de VPN met basisbeveiliging, One voegt antivirus en datalekwaarschuwingen toe, en One+ bevat daarnaast Incogni om je gegevens bij databrokers te laten verwijderen. Jaar- en tweejaarsabonnementen hebben een flinke introductiekorting; de jaarprijzen hier zijn de normale verlengprijzen.",
    website: "https://surfshark.com/nl/",
  },
  expressvpn: {
    tagline: "Bekende VPN-dienst voor veilig en privé internetten.",
    description:
      "ExpressVPN versleutelt je internetverkeer en verbergt je IP-adres op computer, telefoon, tablet en router. Je kiest tussen de pakketten Basic, Advanced en Pro.",
    differences:
      "Basic is de VPN zelf, Advanced en Pro voegen extra privacy- en beveiligingsfuncties toe en laten meer apparaten tegelijk verbinden. Jaarabonnementen zijn per maand veel goedkoper; de getoonde prijzen zijn de normale verlengprijzen, het eerste termijn is vaak afgeprijsd.",
    website: "https://www.expressvpn.com/nl/",
  },
  mullvad: {
    tagline: "Privacy-VPN zonder e-mailadres en met één vaste prijs.",
    description:
      "Mullvad VPN uit Zweden is gericht op maximale privacy: je maakt een account aan zonder e-mailadres en kunt zelfs anoniem of contant betalen. Je gebruikt de VPN op maximaal vijf apparaten tegelijk.",
    differences:
      "Er is maar één abonnement van €5 per maand. Langere periodes kosten per maand hetzelfde, er zijn geen kortingen of lokkertjes.",
    website: "https://mullvad.net/",
  },
  cyberghost: {
    tagline: "VPN met speciale servers voor streaming.",
    description:
      "CyberGhost is een VPN-dienst die je verbinding versleutelt en je IP-adres afschermt. De dienst heeft servers die speciaal zijn ingericht voor streaming en downloaden en werkt op alle gangbare apparaten.",
    differences:
      "Er is één VPN-pakket; je kiest alleen de looptijd. Maandelijks betalen is het duurst, langlopende abonnementen zijn per maand veel goedkoper.",
    website: "https://www.cyberghostvpn.com/nl/",
  },
  norton: {
    tagline: "Antivirus met VPN, wachtwoordmanager en cloudback-up.",
    description:
      "Norton 360 beschermt je computers, telefoons en tablets tegen virussen, ransomware en phishing. Afhankelijk van het pakket krijg je er onder meer een VPN, een wachtwoordmanager en cloudback-up voor Windows bij.",
    differences:
      "Standard beschermt één apparaat, Deluxe meerdere apparaten en Premium tot tien apparaten met meer back-upopslag. Het eerste jaar is meestal fors afgeprijsd; de getoonde bedragen zijn de verlengprijzen.",
    website: "https://nl.norton.com/",
  },
  bitdefender: {
    tagline: "Antivirus voor Windows, Mac, Android en iOS.",
    description:
      "Bitdefender beschermt je apparaten tegen malware, ransomware en phishing en scoort doorgaans hoog in onafhankelijke tests. Total Security is het complete beveiligingspakket voor meerdere apparaten.",
    differences:
      "Total Security dekt vijf apparaten, Total Security Family tot 25 apparaten voor het hele gezin, en Premium Security voegt onder meer onbeperkt VPN toe. De getoonde prijzen gelden voor het eerste jaar; verlengen kan duurder zijn.",
    website: "https://www.bitdefender.com/nl-nl/",
  },
  mcafee: {
    tagline: "Antivirus en online bescherming voor het hele huishouden.",
    description:
      "McAfee biedt beveiligingspakketten tegen virussen, phishing en online oplichting, met extra's zoals een wachtwoordmanager en identiteitsmonitoring. Total Protection is het bekendste pakket voor thuisgebruikers.",
    differences:
      "Het eerste jaar is sterk afgeprijsd; daarna verlengt het abonnement automatisch tegen de hogere normale prijs. De uitgebreidere McAfee+-pakketten voegen meer identiteitsbescherming toe.",
    website: "https://www.mcafee.com/nl-nl/",
  },
  notion: {
    tagline: "Alles-in-één werkruimte voor notities, wiki's en projecten.",
    description:
      "Notion combineert notities, documenten, databases en takenlijsten in één flexibele werkruimte die je met anderen kunt delen. Voor veel persoonlijk gebruik volstaat de gratis versie.",
    differences:
      "Plus is bedoeld voor kleine teams en intensieve gebruikers, met onder meer onbeperkte blokken voor samenwerking en grotere uploads. Je betaalt per lid, en jaarlijks betalen is ongeveer 20% goedkoper.",
    website: "https://www.notion.com/",
  },
  todoist: {
    tagline: "Overzichtelijke takenlijst voor werk en privé.",
    description:
      "Todoist is een takenmanager waarmee je taken, projecten en herinneringen bijhoudt op al je apparaten. Je voegt taken snel toe in gewone taal, zoals 'elke maandag om 9 uur'.",
    differences:
      "Pro voegt onder meer herinneringen, meer projecten, agendakoppeling en extra weergaven toe. Jaarlijks betalen kost €60 per jaar, wat neerkomt op €5 per maand in plaats van €7.",
    website: "https://www.todoist.com/nl",
  },
  evernote: {
    tagline: "Notities, documenten en taken op één plek.",
    description:
      "Evernote is een van de bekendste notitie-apps, waarmee je notities, webpagina's, foto's en documenten verzamelt en doorzoekt. Betaalde abonnementen synchroniseren op meer apparaten en geven meer uploadruimte.",
    differences:
      "Personal is bedoeld voor individueel gebruik, Professional voegt extra functies toe voor intensief en zakelijk gebruik. Jaarlijks betalen is goedkoper dan per maand.",
    website: "https://evernote.com/",
  },
  ticktick: {
    tagline: "Takenlijst met agenda, gewoontetracker en focustimer.",
    description:
      "TickTick is een to-do-app die taken, een agendaweergave, een gewoontetracker en een Pomodoro-focustimer combineert. De app werkt op telefoon, computer en in de browser.",
    differences:
      "Er is één betaald pakket, Premium, dat je per maand of per jaar betaalt. Premium voegt onder meer uitgebreide agendaweergaven, meer lijsten en extra herinneringen toe.",
    website: "https://ticktick.com/",
  },
  figma: {
    tagline: "Ontwerp- en prototypingtool waarin je samen werkt.",
    description:
      "Figma is een populaire tool voor UI-, UX- en grafisch ontwerp, waarin je met meerdere mensen tegelijk aan hetzelfde ontwerp werkt. Ook het online whiteboard FigJam hoort erbij.",
    differences:
      "In het Professional-abonnement betaal je per seat: een Full seat geeft toegang tot alle ontwerptools, een Dev seat is bedoeld voor ontwikkelaars (Dev Mode) en een Collab seat voor FigJam en meekijken. Jaarlijks betalen is goedkoper; de bedragen zijn inclusief btw.",
    website: "https://www.figma.com/",
  },
  jetbrains: {
    tagline: "Professionele IDE's voor ontwikkelaars, zoals IntelliJ IDEA.",
    description:
      "JetBrains maakt ontwikkelomgevingen zoals IntelliJ IDEA, PyCharm, WebStorm en Rider. Met een persoonlijk abonnement gebruik je de betaalde versies voor je eigen projecten.",
    differences:
      "IntelliJ IDEA Ultimate geeft toegang tot één IDE, het All Products Pack tot alle IDE's en tools van JetBrains. Wie blijft betalen krijgt vanaf het tweede jaar korting; de bedragen hier gelden voor het eerste jaar, inclusief btw.",
    website: "https://www.jetbrains.com/",
  },
  zoom: {
    tagline: "Videovergaderen zonder de limiet van 40 minuten.",
    description:
      "Zoom is een bekende dienst voor videogesprekken en online vergaderingen. Met Zoom Workplace Pro duren meetings langer dan de 40 minuten van de gratis versie en krijg je cloudopslag voor opnames.",
    differences:
      "Pro is bedoeld voor particulieren en kleine teams en kost per gebruiker; jaarlijks betalen is goedkoper dan per maand. Voor grotere organisaties zijn er duurdere Business-pakketten.",
    website: "https://www.zoom.com/nl/",
  },
  capcut: {
    tagline: "Videobewerking voor TikTok, Reels en YouTube.",
    description:
      "CapCut is een videobewerkingsapp van ByteDance, het bedrijf achter TikTok, voor telefoon, computer en browser. Met een betaald abonnement krijg je premium effecten, sjablonen, AI-functies en meer cloudopslag.",
    differences:
      "Standard ontgrendelt een deel van de premiumfuncties, Pro geeft toegang tot alle premiumfuncties. Prijzen verschillen per platform (web, App Store of Google Play) en per periode.",
    website: "https://www.capcut.com/nl-nl/",
  },
  setapp: {
    tagline: "Eén abonnement voor een grote collectie Mac-apps.",
    description:
      "Setapp van MacPaw geeft toegang tot een catalogus van honderden betaalde apps voor Mac en iPhone, zoals CleanMyMac, Bartender en Ulysses. Je installeert zoveel apps uit de catalogus als je wilt voor één vast bedrag.",
    differences:
      "Mac is voor één Mac, Mac + iOS voegt apps voor iPhone en iPad toe, en Power User werkt op meerdere Macs en iOS-apparaten. Jaarlijks betalen scheelt tot 40%.",
    website: "https://setapp.com/",
  },
  cleanmymac: {
    tagline: "Opschonen, versnellen en beveiligen van je Mac.",
    description:
      "CleanMyMac van MacPaw ruimt overbodige bestanden op, houdt apps up-to-date en scant je Mac op malware. Zo blijft je Mac snel en overzichtelijk.",
    differences:
      "Je kiest een abonnement voor 1, 2 of 5 Macs. Jaarlijks betalen is veel voordeliger dan per maand.",
    website: "https://cleanmymac.com/",
  },
  backblaze: {
    tagline: "Onbeperkte online back-up van je computer.",
    description:
      "Backblaze Personal Backup maakt automatisch een back-up van de bestanden op je Windows-pc of Mac naar de cloud, zonder opslaglimiet. Ook aangesloten externe schijven kunnen mee in de back-up.",
    differences:
      "Er is één abonnement per computer, dat je per maand of per jaar betaalt; jaarlijks is goedkoper. Backblaze hanteert dollarprijzen, dus het bedrag in euro kan licht variëren.",
    website: "https://www.backblaze.com/",
  },
  pcloud: {
    tagline: "Zwitserse cloudopslag, ook als eenmalige lifetime-aankoop.",
    description:
      "pCloud is een Zwitserse cloudopslagdienst waarmee je bestanden opslaat, synchroniseert en deelt, met de keuze om je data in de EU of de VS te bewaren. Bijzonder is dat je naast een abonnement ook eenmalig kunt betalen voor levenslange opslag.",
    differences:
      "Premium biedt 500 GB en Premium Plus 2 TB opslag. Jaarlijks betalen is voordeliger dan per maand; extra versleuteling (pCloud Encryption) is een aparte uitbreiding.",
    website: "https://www.pcloud.com/nl/",
  },
  mega: {
    tagline: "Cloudopslag met end-to-end-versleuteling.",
    description:
      "MEGA is een cloudopslagdienst uit Nieuw-Zeeland die je bestanden standaard end-to-end versleutelt. Je kunt bestanden opslaan, synchroniseren en veilig delen via links.",
    differences:
      "Pro Lite biedt 400 GB, Pro I 2 TB, Pro II 8 TB en Pro III 16 TB opslag, met steeds meer dataverkeer. Jaarlijks betalen is goedkoper dan per maand.",
    website: "https://mega.io/",
  },
  ynab: {
    tagline: "Budgetapp die elke euro een taak geeft.",
    description:
      "YNAB (You Need A Budget) is een Amerikaanse budgetapp gebaseerd op zero-based budgetteren: je geeft elke euro die binnenkomt een bestemming. Automatische bankkoppeling werkt niet in alle landen, maar je kunt transacties ook handmatig of via een bestand importeren.",
    differences:
      "Er is één abonnement dat je per maand of per jaar betaalt; jaarlijks is flink goedkoper. YNAB rekent af in Amerikaanse dollars, dus het bedrag in euro kan variëren.",
    website: "https://www.ynab.com/",
  },
  wix: {
    tagline: "Website bouwen met slepen en neerzetten.",
    description:
      "Wix is een websitebouwer waarmee je zonder programmeerkennis een website of webshop maakt. Met een Premium-abonnement koppel je een eigen domein, verdwijnen de Wix-advertenties en krijg je meer opslag.",
    differences:
      "Light is voor een eenvoudige website, Core voegt webshop- en marketingfuncties toe, en Business is bedoeld voor serieuze online verkoop. Abonnementen worden doorgaans per jaar vooruit betaald.",
    website: "https://nl.wix.com/",
  },
  squarespace: {
    tagline: "Stijlvolle websites en webshops met kant-en-klare templates.",
    description:
      "Squarespace is een websitebouwer die bekendstaat om zijn strakke ontwerpsjablonen, voor portfolio's, blogs en webshops. Hosting, een SSL-certificaat en de templates zitten in het abonnement.",
    differences:
      "Basic is voor een eenvoudige website, Core voegt meer verkoop- en marketingmogelijkheden toe, en Plus is uitgebreider voor online verkoop. Jaarlijks betalen is voordeliger dan per maand.",
    website: "https://www.squarespace.com/",
  },
  microsoft365basic: {
    tagline: "100 GB OneDrive-opslag en Outlook zonder advertenties.",
    description:
      "Microsoft 365 Basic is het kleinste abonnement van Microsoft, vooral bedoeld voor extra OneDrive-opslag. Je krijgt 100 GB cloudopslag en Outlook zonder advertenties, maar geen desktopversies van Word en Excel.",
    differences:
      "Er is één pakket voor één persoon, dat je per maand of per jaar betaalt. Wil je ook de Office-apps en 1 TB opslag, kijk dan naar Microsoft 365 Personal of Family.",
    website: "https://www.microsoft.com/nl-nl/microsoft-365/onedrive/compare-onedrive-plans",
  },
};
