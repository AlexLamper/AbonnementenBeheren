import type { PresetContent } from "@/lib/presets/content";

export const AI_CONTENT: Record<string, PresetContent> = {
  claude: {
    tagline: "AI-assistent van Anthropic voor schrijven, code en analyse.",
    description:
      "Claude is de AI-assistent van Anthropic die helpt met teksten schrijven, documenten analyseren, programmeren en onderzoek. Met een betaald abonnement krijg je ruimere gebruikslimieten, toegang tot de nieuwste modellen en extra functies zoals Claude Code.",
    differences:
      "Pro is het standaardabonnement en is voordeliger als je per jaar betaalt. Max biedt ongeveer 5 keer zoveel gebruik als Pro en Ultra (voorheen Max 20x) ongeveer 20 keer zoveel, bedoeld voor intensieve gebruikers.",
    website: "https://claude.com/",
  },
  gemini: {
    tagline: "De AI-assistent van Google, inclusief extra opslag.",
    description:
      "Gemini is de AI-assistent van Google, die ook werkt in onder meer Gmail, Docs en Android. Een Google AI-abonnement geeft toegang tot krachtigere Gemini-modellen en hogere limieten, en bevat extra cloudopslag voor Drive, Gmail en Google Foto's.",
    differences:
      "Google AI Plus is de instapversie met 400 GB opslag, Google AI Pro geeft uitgebreidere AI-toegang en 5 TB opslag, en Google AI Ultra biedt 5 of 20 keer de limieten van Pro met minimaal 20 TB opslag.",
    website: "https://gemini.google.com/",
  },
  perplexity: {
    tagline: "AI-zoekmachine die antwoorden geeft met bronvermelding.",
    description:
      "Perplexity combineert een AI-chatbot met een zoekmachine en beantwoordt vragen op basis van actuele webbronnen, met verwijzingen erbij. Met een betaald abonnement doe je meer diepgaande zoekopdrachten en kies je uit verschillende geavanceerde AI-modellen.",
    differences:
      "Pro is bedoeld voor dagelijks gebruik en is ook per jaar af te nemen. Max is het duurste abonnement voor zware gebruikers, met de hoogste limieten en vroege toegang tot nieuwe functies.",
    website: "https://www.perplexity.ai/",
  },
  mistral: {
    tagline: "Europese AI-assistent van het Franse Mistral AI.",
    description:
      "Le Chat is de AI-chatbot van Mistral AI, een Frans AI-bedrijf. Je stelt er vragen, schrijft teksten, zoekt op het web en analyseert documenten; met Pro krijg je hogere limieten en meer functies.",
    differences:
      "Pro is het reguliere betaalde abonnement met ruimere limieten. Studenten krijgen met een geverifieerde studentenstatus flinke korting op hetzelfde abonnement.",
    website: "https://chat.mistral.ai/",
  },
  grok: {
    tagline: "AI-assistent van xAI, nu onderdeel van The X Subscription.",
    description:
      "Grok is de AI-chatbot van xAI, te gebruiken via grok.com, de app en X. Sinds oktober 2026 verkoopt X betaalde Grok-toegang als The X Subscription, een bundel van Grok, X Premium-voordelen en gebruik van Cursor.",
    differences:
      "Plus is de instapversie, Premium bevat de voordelen van het vroegere SuperGrok met 4 keer zoveel gebruik, en Super en Ultra bieden 15 en 50 keer het gebruik van Plus. Bestaande SuperGrok-abonnees kunnen hun oude abonnement houden.",
    website: "https://grok.com/",
  },
  githubcopilot: {
    tagline: "AI-programmeerhulp in je code-editor en op GitHub.",
    description:
      "GitHub Copilot is een AI-assistent voor programmeurs die code aanvult, uitlegt en schrijft in editors zoals VS Code en JetBrains en op GitHub zelf. De betaalde abonnementen bevatten maandelijks AI-tegoed voor geavanceerde modellen en agents.",
    differences:
      "Pro bevat een basishoeveelheid AI-tegoed, Pro+ ongeveer vier keer zoveel, en Max is bedoeld voor ontwikkelaars die zeer intensief met AI-agents werken.",
    website: "https://github.com/features/copilot",
  },
  cursor: {
    tagline: "Code-editor met ingebouwde AI voor sneller programmeren.",
    description:
      "Cursor is een code-editor die volledig rond AI is gebouwd: je laat code schrijven, aanpassen en uitleggen door AI-modellen en agents. De betaalde abonnementen geven meer gebruik van de geavanceerdste modellen.",
    differences:
      "Pro is voor de meeste ontwikkelaars voldoende, Pro+ biedt ongeveer drie keer zoveel gebruik en Ultra is bedoeld voor zeer intensieve gebruikers met de hoogste limieten.",
    website: "https://cursor.com/",
  },
  midjourney: {
    tagline: "AI-beeldgenerator bekend om zijn artistieke stijl.",
    description:
      "Midjourney maakt afbeeldingen op basis van een tekstprompt en staat bekend om zijn kenmerkende, artistieke resultaten. Je werkt via de website of Discord en kunt ook korte video's genereren.",
    differences:
      "De abonnementen verschillen vooral in de hoeveelheid snelle GPU-tijd per maand. Vanaf Standard genereer je onbeperkt in de langzamere Relax-modus, en Pro en Mega voegen Stealth-modus toe zodat je creaties niet openbaar zijn.",
    website: "https://www.midjourney.com/",
  },
  elevenlabs: {
    tagline: "Realistische AI-stemmen en tekst-naar-spraak.",
    description:
      "ElevenLabs zet tekst om in natuurlijk klinkende spraak in tientallen talen en kan stemmen klonen. Het wordt veel gebruikt voor voice-overs, luisterboeken en video's.",
    differences:
      "Starter is de goedkoopste instap met commerciële rechten, Creator geeft meer tegoed en professioneel stemklonen, en Pro is bedoeld voor grote volumes. Creator is ook voordeliger per jaar te betalen.",
    website: "https://elevenlabs.io/",
  },
  suno: {
    tagline: "Complete nummers maken met AI.",
    description:
      "Suno genereert complete nummers met zang en muziek op basis van een korte omschrijving of je eigen songtekst. Met een betaald abonnement krijg je meer tegoed en mag je je nummers commercieel gebruiken.",
    differences:
      "Pro geeft 2.500 credits per maand, Premier 10.000 credits plus toegang tot Suno Studio. Beide zijn met ongeveer 20% korting per jaar te betalen.",
    website: "https://suno.com/",
  },
  runway: {
    tagline: "Video's genereren en bewerken met AI.",
    description:
      "Runway is een creatief platform waarmee je video's genereert en bewerkt met AI, bijvoorbeeld vanuit een tekst of afbeelding. De betaalde abonnementen geven maandelijks credits en exports zonder watermerk.",
    differences:
      "Standard en Pro verschillen vooral in het aantal credits per maand en de beschikbare modellen. Unlimited voegt onbeperkt genereren in een langzamere modus toe.",
    website: "https://runwayml.com/",
  },
  lovable: {
    tagline: "Websites en apps bouwen door te chatten met AI.",
    description:
      "Lovable laat je webapps en websites bouwen door in gewone taal te beschrijven wat je wilt, waarna de AI de code schrijft. Je kunt het resultaat direct publiceren en verder aanpassen.",
    differences:
      "Pro is bedoeld voor individuele makers en is ook per jaar af te nemen. Business voegt functies toe voor teams en organisaties, zoals single sign-on.",
    website: "https://lovable.dev/",
  },
  replit: {
    tagline: "Apps bouwen en publiceren met een AI-agent in je browser.",
    description:
      "Replit is een online ontwikkelomgeving waarin de Replit Agent apps en websites voor je bouwt op basis van een beschrijving. Je programmeert, test en publiceert alles direct vanuit de browser.",
    differences:
      "Core is bedoeld voor individuele makers en is ook per jaar te betalen. Pro is gericht op professionals en kleine teams, met meer tegoed en extra functies.",
    website: "https://replit.com/",
  },
  deepl: {
    tagline: "Nauwkeurig vertalen met AI.",
    description:
      "DeepL is een AI-vertaaldienst die bekendstaat om natuurlijk klinkende vertalingen. Met DeepL Pro krijg je onder meer documentvertaling, extra functies en betere gegevensbeveiliging.",
    differences:
      "Individual is het abonnement voor persoonlijk gebruik en is per maand of met korting per jaar te betalen. Voor teams en bedrijven zijn er aparte zakelijke pakketten.",
    website: "https://www.deepl.com/",
  },
  grammarly: {
    tagline: "AI-schrijfhulp voor foutloze Engelse teksten.",
    description:
      "Grammarly controleert je teksten op spelling, grammatica, toon en duidelijkheid en werkt in je browser, e-mail en tekstverwerker. Grammarly Pro voegt geavanceerde suggesties en uitgebreidere AI-functies toe.",
    differences:
      "Pro is hetzelfde abonnement met drie betaaltermijnen: per maand, per kwartaal of per jaar. Hoe langer de termijn, hoe lager de prijs per maand.",
    website: "https://www.grammarly.com/",
  },
  poe: {
    tagline: "Veel AI-modellen in één app.",
    description:
      "Poe van Quora geeft in één app toegang tot chatbots en modellen van onder meer OpenAI, Anthropic en Google. Met een abonnement krijg je elke maand een grote hoeveelheid punten om ook de krachtigste modellen te gebruiken.",
    differences:
      "Het abonnement is per maand of voordeliger per jaar te betalen. Hoeveel berichten je kunt sturen hangt af van het puntenverbruik van het gekozen model.",
    website: "https://poe.com/",
  },
  characterai: {
    tagline: "Chatten met AI-personages.",
    description:
      "Character.AI laat je gesprekken voeren met AI-personages, van fictieve figuren tot zelfgemaakte karakters. Met c.ai+ krijg je onder meer snellere reacties en extra functies.",
    differences:
      "c.ai+ is per maand of met korting per jaar te betalen. Daarnaast is er een gratis versie met minder functies.",
    website: "https://character.ai/",
  },
  leonardoai: {
    tagline: "AI-afbeeldingen en -video's voor makers.",
    description:
      "Leonardo.Ai is een platform om met AI afbeeldingen en video's te genereren, met veel stijlen, modellen en bewerkingstools. Betaalde abonnementen geven maandelijks tokens en privé-generaties.",
    differences:
      "Apprentice geeft 8.500 fast tokens per maand, Artisan 25.000 met onbeperkt genereren in de langzame modus, en Maestro 60.000 met de hoogste prioriteit.",
    website: "https://leonardo.ai/",
  },
  gamma: {
    tagline: "Presentaties en documenten maken met AI.",
    description:
      "Gamma maakt met AI presentaties, documenten en eenvoudige websites op basis van een korte omschrijving. Met een betaald abonnement verwijder je de Gamma-branding en krijg je meer AI-tegoed en extra functies.",
    differences:
      "Plus is de instapversie zonder Gamma-branding, Pro biedt geavanceerdere AI-modellen en meer mogelijkheden, en Ultra is voor intensieve gebruikers. Plus en Pro zijn voordeliger per jaar.",
    website: "https://gamma.app/",
  },
  heygen: {
    tagline: "AI-video's met digitale avatars.",
    description:
      "HeyGen maakt video's met realistische AI-avatars die jouw tekst uitspreken, in veel talen. Het wordt veel gebruikt voor marketing, uitlegvideo's en het vertalen van bestaande video's.",
    differences:
      "Creator is bedoeld voor individuele makers en is ook per jaar te betalen. Pro geeft meer tegoed en ruimere mogelijkheden voor intensief gebruik.",
    website: "https://www.heygen.com/",
  },
  ideogram: {
    tagline: "AI-beeldgenerator die sterk is in tekst in afbeeldingen.",
    description:
      "Ideogram genereert afbeeldingen op basis van een tekstprompt en staat bekend om het goed weergeven van tekst, bijvoorbeeld in logo's en posters. Betaalde abonnementen geven maandelijks prioriteitscredits.",
    differences:
      "Plus geeft 2.400 prioriteitscredits per maand en Pro 7.500. Beide zijn voordeliger bij jaarlijkse betaling.",
    website: "https://ideogram.ai/",
  },
  otter: {
    tagline: "AI-notulist voor je vergaderingen.",
    description:
      "Otter.ai neemt vergaderingen op, zet ze om in tekst en maakt automatisch samenvattingen en actiepunten. Het werkt met onder meer Zoom, Google Meet en Microsoft Teams.",
    differences:
      "Pro is het abonnement voor individueel gebruik met meer transcriptieminuten dan de gratis versie. Bij jaarlijkse betaling ben je per maand ongeveer de helft goedkoper uit.",
    website: "https://otter.ai/",
  },
};
