// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for German (`de`).
class AppLocalizationsDe extends AppLocalizations {
  AppLocalizationsDe([String locale = 'de']) : super(locale);

  @override
  String get appName => 'AbonnementenBeheren';

  @override
  String get authHeroLine1 => 'In einer Minute';

  @override
  String get authHeroLine2 => 'den Überblick.';

  @override
  String get authHeroBody => 'Alle Abos an einem Ort: Sieh, was du pro Monat und pro Jahr ausgibst.';

  @override
  String get authWelcomeBack => 'Willkommen zurück';

  @override
  String get authCreateTitle => 'Erstelle dein kostenloses Konto';

  @override
  String get authHaveAccountHint => 'Schon ein Konto? Wähle oben Anmelden.';

  @override
  String get authNoAccountHint => 'Noch kein Konto? Wähle oben Registrieren.';

  @override
  String get tabLogin => 'Anmelden';

  @override
  String get tabRegister => 'Registrieren';

  @override
  String get fieldName => 'Name';

  @override
  String get fieldNameHint => 'Dein Name';

  @override
  String get fieldEmail => 'E-Mail-Adresse';

  @override
  String get fieldEmailHint => 'name@beispiel.de';

  @override
  String get fieldPassword => 'Passwort';

  @override
  String get fieldPasswordHintNew => 'Mindestens 8 Zeichen';

  @override
  String get errorNameRequired => 'Gib deinen Namen ein.';

  @override
  String get errorEmailInvalid => 'Gib eine gültige E-Mail-Adresse ein.';

  @override
  String get errorPasswordShort => 'Verwende mindestens 8 Zeichen.';

  @override
  String get errorPasswordRequired => 'Gib dein Passwort ein.';

  @override
  String get buttonLogin => 'Anmelden';

  @override
  String get buttonCreateAccount => 'Konto erstellen';

  @override
  String get busy => 'Einen Moment…';

  @override
  String get authInvalidCredentials => 'E-Mail-Adresse oder Passwort ist falsch.';

  @override
  String get authNoPassword =>
      'Dieses Konto meldet sich mit Google an. Das geht in der App noch nicht; nutze bitte die Website.';

  @override
  String get authEmailTaken => 'Es gibt bereits ein Konto mit dieser E-Mail-Adresse.';

  @override
  String get authAgreePrefix => 'Mit dem Fortfahren akzeptierst du die';

  @override
  String get and => 'und';

  @override
  String get termsLink => 'Nutzungsbedingungen';

  @override
  String get privacyLink => 'Datenschutzerklärung';

  @override
  String get errorNetwork => 'Keine Verbindung. Prüfe dein Internet und versuche es erneut.';

  @override
  String get errorGeneric => 'Etwas ist schiefgelaufen. Bitte versuche es erneut.';

  @override
  String get retry => 'Erneut versuchen';

  @override
  String get greetingNight => 'Gute Nacht';

  @override
  String get greetingMorning => 'Guten Morgen';

  @override
  String get greetingAfternoon => 'Guten Tag';

  @override
  String get greetingEvening => 'Guten Abend';

  @override
  String greetingWithName(String greeting, String name) {
    return '$greeting, $name';
  }

  @override
  String get welcome => 'Willkommen';

  @override
  String welcomeName(String name) {
    return 'Willkommen, $name';
  }

  @override
  String get overviewSubtitleEmpty => 'Füge dein erstes Abo hinzu, um deine Summe zu sehen.';

  @override
  String get overviewSubtitle => 'So stehen deine Abos gerade.';

  @override
  String get statPerMonth => 'Pro Monat';

  @override
  String get statPerYear => 'Pro Jahr';

  @override
  String get statSubscriptions => 'Abos';

  @override
  String get other => 'Sonstige';

  @override
  String get listTitle => 'Abos';

  @override
  String get sortMostExpensive => 'Teuerste zuerst';

  @override
  String get sortCheapest => 'Günstigste zuerst';

  @override
  String get sortName => 'Nach Name';

  @override
  String get sortNewest => 'Neueste zuerst';

  @override
  String get add => 'Hinzufügen';

  @override
  String get emptyTitle => 'Noch keine Abos';

  @override
  String get emptyBody => 'Füge dein erstes Abo hinzu und sieh sofort, was du monatlich ausgibst.';

  @override
  String get emptyAddButton => 'Abo hinzufügen';

  @override
  String get emptyPopular => 'Oder starte mit einem beliebten Dienst';

  @override
  String percentOfTotal(int percent) {
    return '$percent% deiner Summe';
  }

  @override
  String get perMonthLower => 'pro Monat';

  @override
  String get edit => 'Bearbeiten';

  @override
  String get delete => 'Löschen';

  @override
  String get cancel => 'Abbrechen';

  @override
  String deleteConfirmTitle(String name) {
    return '$name löschen?';
  }

  @override
  String get deleteConfirmBody => 'Dieses Abo wird aus deiner Übersicht entfernt.';

  @override
  String get deleted => 'Gelöscht';

  @override
  String addedName(String name) {
    return '$name hinzugefügt';
  }

  @override
  String get saved => 'Gespeichert';

  @override
  String usageCount(int used, int limit) {
    return '$used von $limit kostenlosen Abos';
  }

  @override
  String usageFull(int limit) {
    return 'Alle $limit kostenlosen Plätze belegt';
  }

  @override
  String get unlimited => 'Unbegrenzt';

  @override
  String get periodMonthly => 'Pro Monat';

  @override
  String get periodYearly => 'Pro Jahr';

  @override
  String get periodQuarterly => 'Pro Quartal';

  @override
  String get periodWeekly => 'Pro Woche';

  @override
  String get periodMonthlyShort => 'pro Monat';

  @override
  String get periodYearlyShort => 'pro Jahr';

  @override
  String get periodQuarterlyShort => 'pro Quartal';

  @override
  String get periodWeeklyShort => 'pro Woche';

  @override
  String get addTitle => 'Abo hinzufügen';

  @override
  String get customTitle => 'Eigenes Abo';

  @override
  String get editTitle => 'Abo bearbeiten';

  @override
  String searchHint(int count) {
    return 'Durchsuche $count Dienste, z. B. Spotify';
  }

  @override
  String customAddQuery(String query) {
    return '„$query“ selbst hinzufügen';
  }

  @override
  String get customAdd => 'Eigenes Abo hinzufügen';

  @override
  String get customAddBody => 'Dein Dienst fehlt? Gib Name und Preis selbst ein.';

  @override
  String get popular => 'Beliebt';

  @override
  String noResults(String query) {
    return 'Kein Dienst für „$query“ gefunden. Füge ihn oben selbst hinzu.';
  }

  @override
  String get backToSearch => 'Zurück zur Suche';

  @override
  String plansCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(count, locale: localeName, other: '$count Tarife', one: '1 Tarif');
    return '$_temp0';
  }

  @override
  String get formName => 'Name';

  @override
  String get formPlan => 'Tarif (optional)';

  @override
  String get formPlanHint => 'z. B. Family';

  @override
  String get formPrice => 'Preis (€)';

  @override
  String get formPeriod => 'Zeitraum';

  @override
  String get formCategory => 'Kategorie (optional)';

  @override
  String get formCategoryHint => 'z. B. Streaming';

  @override
  String get formPriceInvalid => 'Gib einen gültigen Preis ein.';

  @override
  String get save => 'Speichern';

  @override
  String get premium => 'Premium';

  @override
  String get paywallHeadline1 => 'Kostenlos starten.';

  @override
  String get paywallHeadline2 => 'Unbegrenzt mit Premium.';

  @override
  String get paywallLimitTitle => 'Limit erreicht';

  @override
  String paywallLimitBody(int limit) {
    return 'Mit einem kostenlosen Konto verwaltest du $limit Abos. Mit Premium so viele du willst.';
  }

  @override
  String paywallBody(int limit) {
    return 'Kostenlos verwaltest du $limit Abos. Premium hebt diese Grenze auf.';
  }

  @override
  String get perkUnlimited => 'Unbegrenzt Abos verwalten';

  @override
  String get perkExport => 'Exportiere deine Übersicht nach Excel (CSV)';

  @override
  String get perkEverywhere => 'Funktioniert auf der Website und in der App';

  @override
  String get perkSupport => 'Unterstütze einen unabhängigen Entwickler';

  @override
  String get planYearly => 'Jährlich';

  @override
  String get planMonthly => 'Monatlich';

  @override
  String get bestValue => 'Am günstigsten';

  @override
  String get buyPremium => 'Premium holen';

  @override
  String get restorePurchases => 'Käufe wiederherstellen';

  @override
  String get paywallLegal =>
      'Premium verlängert sich automatisch, bis du kündigst. Kündigen kannst du jederzeit in den Einstellungen von App Store oder Google Play.';

  @override
  String get purchaseSuccess => 'Willkommen bei Premium!';

  @override
  String get restoreNone => 'Keine früheren Käufe gefunden.';

  @override
  String get restoreSuccess => 'Deine Käufe wurden wiederhergestellt.';

  @override
  String get storeUnavailable => 'Käufe sind gerade nicht verfügbar. Bitte versuche es später erneut.';

  @override
  String get youArePremium => 'Du hast Premium. Danke für deine Unterstützung!';

  @override
  String get settingsTitle => 'Einstellungen';

  @override
  String get account => 'Konto';

  @override
  String get language => 'Sprache';

  @override
  String get languageSystem => 'Systemsprache';

  @override
  String get plan => 'Tarif';

  @override
  String get planFree => 'Kostenlos';

  @override
  String get manageSubscription => 'Abo verwalten';

  @override
  String get premiumViaWeb => 'Du hast Premium über die Website. Verwalte es auf abonnementenbeheren.com.';

  @override
  String get premiumGranted => 'Du hast Premium geschenkt bekommen.';

  @override
  String get exportCsv => 'Als CSV exportieren';

  @override
  String get logout => 'Abmelden';

  @override
  String get deleteAccount => 'Konto löschen';

  @override
  String get deleteAccountBody =>
      'Dein Konto und alle deine Abos werden endgültig gelöscht. Das lässt sich nicht rückgängig machen.';

  @override
  String get deleteAccountStoreNote => 'Premium in der App gekauft? Kündige es auch im App Store oder bei Google Play.';

  @override
  String get accountDeleted => 'Dein Konto wurde gelöscht.';

  @override
  String get viewOffer => 'Angebot ansehen';

  @override
  String get termsOfUse => 'Nutzungsbedingungen (EULA)';

  @override
  String paywallMonthlyPer(String price) {
    return '$price pro Monat';
  }

  @override
  String get legal => 'Info';

  @override
  String get catAiSoftware => 'KI & Software';

  @override
  String get catStreaming => 'Streaming';

  @override
  String get catNews => 'Nachrichten & Magazine';

  @override
  String get catGaming => 'Gaming';

  @override
  String get catSport => 'Sport';

  @override
  String get catMobile => 'Mobilfunk';

  @override
  String get catAppsLifestyle => 'Apps & Lifestyle';

  @override
  String get catInternetTv => 'Internet & TV';

  @override
  String get catMusic => 'Musik';

  @override
  String get catOutings => 'Ausflüge & Kultur';

  @override
  String get catMobility => 'Mobilität';

  @override
  String get catBooks => 'Bücher';

  @override
  String get catFood => 'Essen & Lieferung';
}
