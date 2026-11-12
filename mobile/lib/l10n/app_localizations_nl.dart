// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Dutch Flemish (`nl`).
class AppLocalizationsNl extends AppLocalizations {
  AppLocalizationsNl([String locale = 'nl']) : super(locale);

  @override
  String get appName => 'AbonnementenBeheren';

  @override
  String get authHeroLine1 => 'Binnen een minuut';

  @override
  String get authHeroLine2 => 'overzicht.';

  @override
  String get authHeroBody =>
      'Zet al je abonnementen op één plek en zie wat je per maand en per jaar kwijt bent.';

  @override
  String get authWelcomeBack => 'Welkom terug';

  @override
  String get authCreateTitle => 'Maak je gratis account';

  @override
  String get authHaveAccountHint => 'Al een account? Kies hierboven Inloggen.';

  @override
  String get authNoAccountHint =>
      'Nog geen account? Kies hierboven Registreren.';

  @override
  String get tabLogin => 'Inloggen';

  @override
  String get tabRegister => 'Registreren';

  @override
  String get fieldName => 'Naam';

  @override
  String get fieldNameHint => 'Je naam';

  @override
  String get fieldEmail => 'E-mailadres';

  @override
  String get fieldEmailHint => 'naam@voorbeeld.nl';

  @override
  String get fieldPassword => 'Wachtwoord';

  @override
  String get fieldPasswordHintNew => 'Minimaal 8 tekens';

  @override
  String get errorNameRequired => 'Vul je naam in.';

  @override
  String get errorEmailInvalid => 'Vul een geldig e-mailadres in.';

  @override
  String get errorPasswordShort => 'Gebruik minimaal 8 tekens.';

  @override
  String get errorPasswordRequired => 'Vul je wachtwoord in.';

  @override
  String get buttonLogin => 'Inloggen';

  @override
  String get buttonCreateAccount => 'Account aanmaken';

  @override
  String get busy => 'Bezig…';

  @override
  String get authInvalidCredentials => 'E-mailadres of wachtwoord is onjuist.';

  @override
  String get authNoPassword =>
      'Dit account logt in met Google. Dat kan nog niet in de app; gebruik de website.';

  @override
  String get authEmailTaken => 'Er bestaat al een account met dit e-mailadres.';

  @override
  String get authAgreePrefix => 'Door verder te gaan ga je akkoord met de';

  @override
  String get and => 'en';

  @override
  String get termsLink => 'Voorwaarden';

  @override
  String get privacyLink => 'Privacyverklaring';

  @override
  String get errorNetwork =>
      'Geen verbinding. Controleer je internet en probeer het opnieuw.';

  @override
  String get errorGeneric => 'Er ging iets mis. Probeer het opnieuw.';

  @override
  String get retry => 'Opnieuw proberen';

  @override
  String get greetingNight => 'Goedenacht';

  @override
  String get greetingMorning => 'Goedemorgen';

  @override
  String get greetingAfternoon => 'Goedemiddag';

  @override
  String get greetingEvening => 'Goedeavond';

  @override
  String greetingWithName(String greeting, String name) {
    return '$greeting, $name';
  }

  @override
  String get welcome => 'Welkom';

  @override
  String welcomeName(String name) {
    return 'Welkom, $name';
  }

  @override
  String get overviewSubtitleEmpty =>
      'Voeg je eerste abonnement toe om je totaal te zien.';

  @override
  String get overviewSubtitle => 'Zo staan je abonnementen er nu voor.';

  @override
  String get statPerMonth => 'Per maand';

  @override
  String get statPerYear => 'Per jaar';

  @override
  String get statSubscriptions => 'Abonnementen';

  @override
  String get other => 'Overig';

  @override
  String get listTitle => 'Abonnementen';

  @override
  String get sortMostExpensive => 'Duurste eerst';

  @override
  String get sortCheapest => 'Goedkoopste eerst';

  @override
  String get sortName => 'Op naam';

  @override
  String get sortNewest => 'Nieuwste eerst';

  @override
  String get add => 'Toevoegen';

  @override
  String get emptyTitle => 'Nog geen abonnementen';

  @override
  String get emptyBody =>
      'Voeg je eerste abonnement toe en zie meteen wat je per maand kwijt bent.';

  @override
  String get emptyAddButton => 'Abonnement toevoegen';

  @override
  String get emptyPopular => 'Of begin met een populaire dienst';

  @override
  String percentOfTotal(int percent) {
    return '$percent% van je totaal';
  }

  @override
  String get perMonthLower => 'per maand';

  @override
  String get edit => 'Bewerken';

  @override
  String get delete => 'Verwijderen';

  @override
  String get cancel => 'Annuleer';

  @override
  String deleteConfirmTitle(String name) {
    return '$name verwijderen?';
  }

  @override
  String get deleteConfirmBody => 'Dit abonnement verdwijnt uit je overzicht.';

  @override
  String get deleted => 'Verwijderd';

  @override
  String addedName(String name) {
    return '$name toegevoegd';
  }

  @override
  String get saved => 'Opgeslagen';

  @override
  String usageCount(int used, int limit) {
    return '$used van $limit gratis abonnementen';
  }

  @override
  String usageFull(int limit) {
    return 'Alle $limit gratis plekken gebruikt';
  }

  @override
  String get unlimited => 'Onbeperkt';

  @override
  String get periodMonthly => 'Per maand';

  @override
  String get periodYearly => 'Per jaar';

  @override
  String get periodQuarterly => 'Per kwartaal';

  @override
  String get periodWeekly => 'Per week';

  @override
  String get periodMonthlyShort => 'per maand';

  @override
  String get periodYearlyShort => 'per jaar';

  @override
  String get periodQuarterlyShort => 'per kwartaal';

  @override
  String get periodWeeklyShort => 'per week';

  @override
  String get addTitle => 'Abonnement toevoegen';

  @override
  String get customTitle => 'Eigen abonnement';

  @override
  String get editTitle => 'Abonnement bewerken';

  @override
  String searchHint(int count) {
    return 'Zoek tussen $count diensten, bijv. Spotify';
  }

  @override
  String customAddQuery(String query) {
    return '“$query” zelf toevoegen';
  }

  @override
  String get customAdd => 'Eigen abonnement toevoegen';

  @override
  String get customAddBody =>
      'Staat je dienst er niet bij? Vul naam en prijs zelf in.';

  @override
  String get popular => 'Populair';

  @override
  String noResults(String query) {
    return 'Geen dienst gevonden voor “$query”. Voeg \'m hierboven zelf toe.';
  }

  @override
  String get backToSearch => 'Terug naar zoeken';

  @override
  String plansCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count pakketten',
      one: '1 pakket',
    );
    return '$_temp0';
  }

  @override
  String get formName => 'Naam';

  @override
  String get formPlan => 'Pakket (optioneel)';

  @override
  String get formPlanHint => 'bijv. Family';

  @override
  String get formPrice => 'Prijs (€)';

  @override
  String get formPeriod => 'Periode';

  @override
  String get formCategory => 'Categorie (optioneel)';

  @override
  String get formCategoryHint => 'bijv. Streaming';

  @override
  String get formPriceInvalid => 'Vul een geldige prijs in.';

  @override
  String get save => 'Opslaan';

  @override
  String get premium => 'Premium';

  @override
  String get paywallHeadline1 => 'Gratis beginnen.';

  @override
  String get paywallHeadline2 => 'Onbeperkt met Premium.';

  @override
  String get paywallLimitTitle => 'Limiet bereikt';

  @override
  String paywallLimitBody(int limit) {
    return 'Met een gratis account houd je $limit abonnementen bij. Met Premium voeg je er zoveel toe als je wilt.';
  }

  @override
  String paywallBody(int limit) {
    return 'Gratis houd je $limit abonnementen bij. Premium haalt die grens weg.';
  }

  @override
  String get perkUnlimited => 'Onbeperkt abonnementen bijhouden';

  @override
  String get perkExport => 'Exporteer je overzicht naar Excel (CSV)';

  @override
  String get perkEverywhere => 'Werkt op de website én in de app';

  @override
  String get perkSupport => 'Steun een onafhankelijke maker';

  @override
  String get planYearly => 'Per jaar';

  @override
  String get planMonthly => 'Per maand';

  @override
  String get bestValue => 'Voordeligst';

  @override
  String get buyPremium => 'Neem Premium';

  @override
  String get restorePurchases => 'Aankopen herstellen';

  @override
  String paywallLegal(String store) {
    return 'Premium verlengt automatisch tot je opzegt. Opzeggen kan altijd via je $store-instellingen.';
  }

  @override
  String get purchaseSuccess => 'Welkom bij Premium!';

  @override
  String get restoreNone => 'Geen eerdere aankopen gevonden.';

  @override
  String get restoreSuccess => 'Je aankopen zijn hersteld.';

  @override
  String get storeUnavailable =>
      'Aankopen zijn nu niet beschikbaar. Probeer het later opnieuw.';

  @override
  String get youArePremium => 'Je hebt Premium. Bedankt voor je steun!';

  @override
  String get settingsTitle => 'Instellingen';

  @override
  String get account => 'Account';

  @override
  String get language => 'Taal';

  @override
  String get languageSystem => 'Systeemtaal';

  @override
  String get plan => 'Abonnement';

  @override
  String get planFree => 'Gratis';

  @override
  String get manageSubscription => 'Abonnement beheren';

  @override
  String get premiumViaWeb =>
      'Je hebt Premium via de website. Beheer het op abonnementenbeheren.com.';

  @override
  String get premiumGranted => 'Je hebt Premium cadeau gekregen.';

  @override
  String get exportCsv => 'Exporteer als CSV';

  @override
  String get logout => 'Uitloggen';

  @override
  String get deleteAccount => 'Account verwijderen';

  @override
  String get deleteAccountBody =>
      'Je account en al je abonnementen worden definitief verwijderd. Dit kun je niet ongedaan maken.';

  @override
  String deleteAccountStoreNote(String store) {
    return 'Heb je Premium in de app gekocht? Zeg het dan ook op via $store.';
  }

  @override
  String get accountDeleted => 'Je account is verwijderd.';

  @override
  String get viewOffer => 'Bekijk aanbieding';

  @override
  String get termsOfUse => 'Gebruiksvoorwaarden (EULA)';

  @override
  String paywallMonthlyPer(String price) {
    return '$price per maand';
  }

  @override
  String get legal => 'Over';

  @override
  String get catAiSoftware => 'AI & Software';

  @override
  String get catStreaming => 'Streaming';

  @override
  String get catNews => 'Nieuws & Tijdschriften';

  @override
  String get catGaming => 'Gaming';

  @override
  String get catSport => 'Sport';

  @override
  String get catMobile => 'Mobiel';

  @override
  String get catAppsLifestyle => 'Apps & Lifestyle';

  @override
  String get catInternetTv => 'Internet & TV';

  @override
  String get catMusic => 'Muziek';

  @override
  String get catOutings => 'Uitjes & Cultuur';

  @override
  String get catMobility => 'Mobiliteit';

  @override
  String get catBooks => 'Boeken';

  @override
  String get catFood => 'Eten & Bezorging';
}
