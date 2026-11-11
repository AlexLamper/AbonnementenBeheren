import type { PresetContent } from "@/lib/presets/content";

export const GAMINGSPORT_CONTENT: Record<string, PresetContent> = {
  // ---------- Gaming ----------
  eaplay: {
    tagline: "Gameabonnement van EA met een bibliotheek vol EA-games.",
    description:
      "EA Play geeft toegang tot een verzameling EA-games, zoals titels uit Battlefield, EA Sports FC en The Sims. Je krijgt ook proefversies van nieuwe releases en korting in de EA-winkel, op pc, PlayStation en Xbox.",
    differences:
      "EA Play geeft toegang tot de spellenbibliotheek, proefversies en 10% korting. EA Play Pro is alleen voor pc en bevat ook de nieuwste EA-games volledig vanaf de release, inclusief luxere edities. Met een jaarabonnement betaal je per maand minder.",
    website: "https://www.ea.com/nl-nl/ea-play",
  },
  ubisoftplus: {
    tagline: "Games uit de Ubisoft-catalogus via één abonnement.",
    description:
      "Ubisoft+ is het gameabonnement van Ubisoft met toegang tot reeksen als Assassin's Creed, Far Cry en Rainbow Six. Je speelt de games zolang je abonnement loopt.",
    differences:
      "Classics geeft toegang tot een selectie oudere Ubisoft-games. Premium bevat ook nieuwe Ubisoft-releases vanaf de eerste dag, inclusief premium-edities en extra content, en is speelbaar op meer platforms zoals pc en Xbox.",
    website: "https://store.ubisoft.com/nl/ubisoftplus",
  },
  geforcenow: {
    tagline: "Je eigen pc-games streamen vanuit de cloud van NVIDIA.",
    description:
      "Met GeForce NOW speel je pc-games die je al bezit, bijvoorbeeld via Steam, Epic Games of Ubisoft, op krachtige servers van NVIDIA. Je hebt geen dure gaming-pc nodig: je streamt naar laptop, Mac, tv, telefoon of tablet.",
    differences:
      "Performance biedt sessies tot 6 uur, Ultimate draait op de krachtigste RTX-hardware met hogere resolutie en framerate en sessies tot 8 uur. Beide hebben een limiet van 100 speeluren per maand, en een jaarabonnement is per maand voordeliger.",
    website: "https://www.nvidia.com/nl-nl/geforce-now/",
  },
  discordnitro: {
    tagline: "Eigen emoji, grotere uploads en extra's op Discord.",
    description:
      "Discord Nitro is het betaalde abonnement van chatplatform Discord. Je gebruikt onder meer eigen emoji en stickers op elke server, uploadt grotere bestanden en maakt je profiel persoonlijker.",
    differences:
      "Nitro Basic biedt de basisvoordelen, zoals eigen emoji overal en grotere uploads. Nitro voegt daar onder meer server boosts, HD-streaming en meer profielopties aan toe. Met een jaarabonnement betaal je minder dan per maand.",
    website: "https://discord.com/nitro",
  },
  applearcade: {
    tagline: "Games zonder advertenties of in-app aankopen.",
    description:
      "Apple Arcade is de gamedienst van Apple met een groeiende verzameling games voor iPhone, iPad, Mac en Apple TV. Alle games zijn zonder advertenties en zonder in-app aankopen.",
    differences:
      "Er is één abonnement, dat je met maximaal zes personen deelt via Delen met gezin. Apple Arcade zit ook in de Apple One-bundels.",
    website: "https://www.apple.com/nl/apple-arcade/",
  },
  googleplaypass: {
    tagline: "Honderden Android-apps en -games zonder advertenties.",
    description:
      "Google Play Pass geeft toegang tot honderden apps en games in de Play Store zonder advertenties, in-app aankopen of aankoopprijs. Het abonnement is bedoeld voor Android-apparaten.",
    differences:
      "Er is één abonnement, per maand of per jaar te betalen; per jaar ben je goedkoper uit. Je kunt Play Pass delen met maximaal vijf gezinsleden.",
    website: "https://play.google.com/about/play-pass/",
  },
  worldofwarcraft: {
    tagline: "Het bekende online rollenspel van Blizzard.",
    description:
      "Met een World of Warcraft-abonnement speel je de MMORPG van Blizzard, inclusief toegang tot World of Warcraft Classic. De nieuwste uitbreiding koop je los; het abonnement geeft je speeltijd.",
    differences:
      "Je koopt dezelfde speeltijd per 1, 3, 6 of 12 maanden: hoe langer de looptijd, hoe lager de prijs per maand. Het bedrag voor de hele periode wordt vooraf afgeschreven.",
    website: "https://worldofwarcraft.blizzard.com/",
  },
  finalfantasyxiv: {
    tagline: "Online rollenspel in de wereld van Final Fantasy.",
    description:
      "Final Fantasy XIV Online is de MMORPG van Square Enix met een uitgebreid verhaal en meerdere uitbreidingen. Na de gratis proefversie heb je een abonnement nodig om verder te spelen.",
    differences:
      "Met Entry Course maak je één personage per server, met Standard Course tot acht. De game zelf en de uitbreidingen koop je los.",
    website: "https://eu.finalfantasyxiv.com/",
  },
  fortnitecrew: {
    tagline: "Maandabonnement met passes en V-Bucks voor Fortnite.",
    description:
      "Fortnite Crew is het abonnement van Epic Games voor Fortnite. Je krijgt elke maand V-Bucks, een exclusief Crew-pakket en toegang tot de Battle Pass en andere passes.",
    differences:
      "Er is één abonnement. Je krijgt 800 V-Bucks per maand plus onder meer de Battle Pass, OG Pass, LEGO Pass, Music Pass en Rocket Pass Premium voor Rocket League.",
    website: "https://www.fortnite.com/",
  },
  minecraftrealms: {
    tagline: "Je eigen Minecraft-server om met vrienden te spelen.",
    description:
      "Minecraft Realms is de officiële serverdienst van Mojang. Je wereld blijft altijd online, ook als jij niet speelt, zodat vrienden er op elk moment bij kunnen.",
    differences:
      "Realms en Realms Plus zijn voor Bedrock Edition (console, mobiel en Windows); Realms Plus biedt ruimte voor meer spelers en een grote verzameling Marketplace-content. Realms voor Java Edition is een aparte server voor de Java-versie op pc.",
    website: "https://www.minecraft.net/nl-nl/realms",
  },
  robloxpremium: {
    tagline: "Maandelijks Robux en extra voordelen in Roblox.",
    description:
      "Roblox Premium is het abonnement van Roblox waarmee je elke maand een vast aantal Robux ontvangt. Daarnaast krijg je extra Robux bij aankopen, kun je items ruilen en krijg je extra's in games die Premium ondersteunen.",
    differences:
      "Het getal in de naam is het aantal Robux dat je per maand krijgt: 450, 1000 of 2200. De overige voordelen zijn bij alle drie gelijk.",
    website: "https://www.roblox.com/",
  },
  metahorizonplus: {
    tagline: "Gameabonnement voor Meta Quest-headsets.",
    description:
      "Meta Horizon+ (voorheen Meta Quest+) is het abonnement voor Meta Quest VR-headsets. Je krijgt toegang tot een catalogus van meer dan 40 VR-games, maandelijks nieuwe titels en exclusieve aanbiedingen.",
    differences:
      "Er is één abonnement, per maand of per jaar te betalen; met een jaarabonnement betaal je per maand flink minder.",
    website: "https://www.meta.com/nl/meta-horizon-plus/",
  },
  humblechoice: {
    tagline: "Elke maand een nieuwe selectie pc-games om te houden.",
    description:
      "Humble Choice is het maandabonnement van Humble Bundle. Elke maand krijg je een selectie pc-games die je mag houden, meestal te activeren via Steam, en een deel van de opbrengst gaat naar goede doelen.",
    differences:
      "Er is één abonnement. Spreken de games van een maand je niet aan, dan kun je die maand overslaan zonder te betalen.",
    website: "https://www.humblebundle.com/",
  },
  twitchturbo: {
    tagline: "Twitch kijken zonder advertenties.",
    description:
      "Twitch Turbo is het abonnement van streamingplatform Twitch waarmee je zonder advertenties kijkt op vrijwel alle kanalen. Daarnaast krijg je onder meer extra emotes en een Turbo-badge in de chat.",
    differences:
      "Er is één abonnement. Turbo is iets anders dan een kanaalabonnement: met een sub steun je één streamer, terwijl Turbo de advertenties op heel Twitch weghaalt.",
    website: "https://www.twitch.tv/",
  },

  // ---------- Sport ----------
  sportcity: {
    tagline: "Sportschoolketen met clubs door heel Nederland.",
    description:
      "SportCity heeft sportscholen in heel Nederland voor kracht, cardio en groepslessen. Je traint in je eigen club of, met een ruimer lidmaatschap, in meerdere clubs.",
    differences:
      "City One geeft toegang tot één club en City Plus tot meerdere clubs. Het studentenlidmaatschap is voor scholieren en studenten vanaf 16 jaar, met een jaarcontract. Dit zijn vanaf-prijzen per 4 weken; de echte prijs verschilt per club en contractduur (flex, 3 maanden, 1 of 2 jaar).",
    website: "https://www.sportcity.nl/",
  },
  anytimefitness: {
    tagline: "Sportschool die dag en nacht open is.",
    description:
      "Anytime Fitness is een internationale sportschoolketen waarvan de clubs 24 uur per dag, 7 dagen per week toegankelijk zijn met een persoonlijke toegangspas. Als lid kun je ook trainen bij Anytime Fitness-clubs in andere steden en landen.",
    differences:
      "Een jaarlidmaatschap is per periode goedkoper dan een maandelijks opzegbaar lidmaatschap. Omdat elke club zelfstandig wordt gerund, verschillen prijzen per club en contract; dit zijn indicatieve vanaf-prijzen.",
    website: "https://www.anytimefitness.nl/",
  },
  trainmore: {
    tagline: "Sportscholen in onder meer Amsterdam, Rotterdam en Utrecht.",
    description:
      "TrainMore is een Nederlandse sportschoolketen met clubs in onder meer Amsterdam, Rotterdam en Utrecht. Je traint er met moderne apparatuur en kunt groepslessen en personal training volgen.",
    differences:
      "Het standaardlidmaatschap is de instapoptie. Prijzen kunnen per club, lidmaatschapstype en contractduur verschillen; dit is een vanaf-prijs per 4 weken.",
    website: "https://trainmore.nl/",
  },
  urbansportsclub: {
    tagline: "Eén lidmaatschap voor honderden sportlocaties.",
    description:
      "Urban Sports Club geeft met één lidmaatschap toegang tot sportscholen, yoga- en boksstudio's, zwembaden en meer, in Nederland en andere Europese landen. OneFit is inmiddels opgegaan in Urban Sports Club.",
    differences:
      "Essential heeft de minste check-ins per maand, Classic meer, en Premium en Max de meeste plus Plus-check-ins voor onder meer massages. Dit zijn maandprijzen bij een jaarcontract; maandelijks opzegbaar is duurder, en prijzen en aantallen check-ins kunnen per stad verschillen.",
    website: "https://urbansportsclub.com/nl",
  },
  zwift: {
    tagline: "Virtueel fietsen en hardlopen met sporters wereldwijd.",
    description:
      "Zwift is een app waarmee je binnen fietst of hardloopt in virtuele werelden, op een slimme fietstrainer of loopband. Je doet mee aan groepsritten, races en trainingsschema's met andere sporters.",
    differences:
      "Het standaardabonnement geeft toegang tot alle werelden, ritten en trainingen; per jaar betaal je minder dan per maand. Zwift Plus voegt daar extra's zoals coaching en echte videoroutes aan toe.",
    website: "https://www.zwift.com/",
  },
  garminconnectplus: {
    tagline: "Extra inzichten en AI-functies in de Garmin Connect-app.",
    description:
      "Garmin Connect+ is een optioneel abonnement bovenop de gratis Garmin Connect-app. Je krijgt onder meer AI-gestuurde inzichten in je gezondheid en trainingen, extra prestatiegrafieken en uitgebreidere live tracking.",
    differences:
      "Er is één abonnement, per maand of per jaar te betalen; het jaarabonnement is voordeliger. De bestaande gratis functies van Garmin Connect blijven zonder abonnement beschikbaar.",
    website: "https://www.garmin.com/",
  },
  runna: {
    tagline: "Persoonlijke hardloopschema's en coaching in één app.",
    description:
      "Runna maakt persoonlijke trainingsschema's voor hardlopers, van je eerste 5 kilometer tot een marathon. De app past je schema aan op je niveau en voortgang en werkt samen met sporthorloges van onder meer Garmin, Apple en COROS.",
    differences:
      "Er is één Premium-abonnement, per maand of per jaar; per jaar betaal je ongeveer de helft per maand. Strava biedt ook een gecombineerd abonnement met Runna aan.",
    website: "https://www.runna.com/nl",
  },
  komoot: {
    tagline: "Routeplanner voor fietsen, wandelen en hardlopen.",
    description:
      "Komoot is een app om fiets-, wandel- en hardlooproutes te plannen en te volgen met spraaknavigatie. Met Premium krijg je extra functies zoals kaarten van de hele wereld, weersvoorspellingen per route en live tracking.",
    differences:
      "Premium is een jaarabonnement. Wil je geen abonnement, dan kun je ook eenmalig losse kaartregio's of het wereldpakket kopen.",
    website: "https://www.komoot.com/",
  },
  fitbitpremium: {
    tagline: "Uitgebreidere gezondheids- en slaapinzichten voor Fitbit.",
    description:
      "Fitbit Premium heet sinds mei 2026 Google Health Premium: het betaalde abonnement in de Google Health-app van Google (voorheen de Fitbit-app). Je krijgt onder meer uitgebreidere slaapanalyses, een dagelijkse paraatheidsscore, begeleide workouts en de AI-coach Google Health Coach op basis van Gemini.",
    differences:
      "Er is één abonnement, per maand of per jaar te betalen; met een jaarabonnement betaal je per maand minder. Bij een nieuw Fitbit-apparaat of Pixel Watch zit vaak een gratis proefperiode, en in een aantal landen zit Google Health Premium ook bij Google AI Pro en Ultra.",
    website: "https://www.fitbit.com/",
  },
  applefitnessplus: {
    tagline: "Workouts en meditaties van Apple met je Apple Watch.",
    description:
      "Apple Fitness+ biedt video-workouts en meditaties met trainers, van HIIT en krachttraining tot yoga en pilates. Je volgt ze op iPhone, iPad of Apple TV, en met een Apple Watch zie je je statistieken live in beeld. Sinds december 2025 is de dienst ook in Nederland beschikbaar.",
    differences:
      "Er is één abonnement, per maand of per jaar te betalen; per jaar ben je voordeliger uit. Je kunt Fitness+ via Delen met gezin met maximaal vijf anderen delen.",
    website: "https://www.apple.com/nl/apple-fitness-plus/",
  },
  myfitnesspal: {
    tagline: "Calorieën en voeding bijhouden met een bekende food-tracker.",
    description:
      "MyFitnessPal is een app om je eten, calorieën en macronutriënten bij te houden, met een grote database aan voedingsmiddelen. Met Premium krijg je extra's zoals de barcodescanner, eigen doelen per macronutriënt en een app zonder advertenties.",
    differences:
      "Er is één Premium-abonnement, per maand of per jaar te betalen; het jaarabonnement is per maand flink goedkoper. De basisfuncties zijn gratis te gebruiken.",
    website: "https://www.myfitnesspal.com/",
  },
};
