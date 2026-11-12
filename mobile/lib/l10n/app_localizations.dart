import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_de.dart';
import 'app_localizations_en.dart';
import 'app_localizations_es.dart';
import 'app_localizations_fr.dart';
import 'app_localizations_nl.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale) : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates = <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('de'),
    Locale('en'),
    Locale('es'),
    Locale('fr'),
    Locale('nl'),
  ];

  /// No description provided for @appName.
  ///
  /// In nl, this message translates to:
  /// **'AbonnementenBeheren'**
  String get appName;

  /// No description provided for @authHeroLine1.
  ///
  /// In nl, this message translates to:
  /// **'Binnen een minuut'**
  String get authHeroLine1;

  /// No description provided for @authHeroLine2.
  ///
  /// In nl, this message translates to:
  /// **'overzicht.'**
  String get authHeroLine2;

  /// No description provided for @authHeroBody.
  ///
  /// In nl, this message translates to:
  /// **'Zet al je abonnementen op één plek en zie wat je per maand en per jaar kwijt bent.'**
  String get authHeroBody;

  /// No description provided for @authWelcomeBack.
  ///
  /// In nl, this message translates to:
  /// **'Welkom terug'**
  String get authWelcomeBack;

  /// No description provided for @authCreateTitle.
  ///
  /// In nl, this message translates to:
  /// **'Maak je gratis account'**
  String get authCreateTitle;

  /// No description provided for @authHaveAccountHint.
  ///
  /// In nl, this message translates to:
  /// **'Al een account? Kies hierboven Inloggen.'**
  String get authHaveAccountHint;

  /// No description provided for @authNoAccountHint.
  ///
  /// In nl, this message translates to:
  /// **'Nog geen account? Kies hierboven Registreren.'**
  String get authNoAccountHint;

  /// No description provided for @tabLogin.
  ///
  /// In nl, this message translates to:
  /// **'Inloggen'**
  String get tabLogin;

  /// No description provided for @tabRegister.
  ///
  /// In nl, this message translates to:
  /// **'Registreren'**
  String get tabRegister;

  /// No description provided for @fieldName.
  ///
  /// In nl, this message translates to:
  /// **'Naam'**
  String get fieldName;

  /// No description provided for @fieldNameHint.
  ///
  /// In nl, this message translates to:
  /// **'Je naam'**
  String get fieldNameHint;

  /// No description provided for @fieldEmail.
  ///
  /// In nl, this message translates to:
  /// **'E-mailadres'**
  String get fieldEmail;

  /// No description provided for @fieldEmailHint.
  ///
  /// In nl, this message translates to:
  /// **'naam@voorbeeld.nl'**
  String get fieldEmailHint;

  /// No description provided for @fieldPassword.
  ///
  /// In nl, this message translates to:
  /// **'Wachtwoord'**
  String get fieldPassword;

  /// No description provided for @fieldPasswordHintNew.
  ///
  /// In nl, this message translates to:
  /// **'Minimaal 8 tekens'**
  String get fieldPasswordHintNew;

  /// No description provided for @errorNameRequired.
  ///
  /// In nl, this message translates to:
  /// **'Vul je naam in.'**
  String get errorNameRequired;

  /// No description provided for @errorEmailInvalid.
  ///
  /// In nl, this message translates to:
  /// **'Vul een geldig e-mailadres in.'**
  String get errorEmailInvalid;

  /// No description provided for @errorPasswordShort.
  ///
  /// In nl, this message translates to:
  /// **'Gebruik minimaal 8 tekens.'**
  String get errorPasswordShort;

  /// No description provided for @errorPasswordRequired.
  ///
  /// In nl, this message translates to:
  /// **'Vul je wachtwoord in.'**
  String get errorPasswordRequired;

  /// No description provided for @buttonLogin.
  ///
  /// In nl, this message translates to:
  /// **'Inloggen'**
  String get buttonLogin;

  /// No description provided for @buttonCreateAccount.
  ///
  /// In nl, this message translates to:
  /// **'Account aanmaken'**
  String get buttonCreateAccount;

  /// No description provided for @busy.
  ///
  /// In nl, this message translates to:
  /// **'Bezig…'**
  String get busy;

  /// No description provided for @authInvalidCredentials.
  ///
  /// In nl, this message translates to:
  /// **'E-mailadres of wachtwoord is onjuist.'**
  String get authInvalidCredentials;

  /// No description provided for @authNoPassword.
  ///
  /// In nl, this message translates to:
  /// **'Dit account logt in met Google. Dat kan nog niet in de app; gebruik de website.'**
  String get authNoPassword;

  /// No description provided for @authEmailTaken.
  ///
  /// In nl, this message translates to:
  /// **'Er bestaat al een account met dit e-mailadres.'**
  String get authEmailTaken;

  /// No description provided for @authAgreePrefix.
  ///
  /// In nl, this message translates to:
  /// **'Door verder te gaan ga je akkoord met de'**
  String get authAgreePrefix;

  /// No description provided for @and.
  ///
  /// In nl, this message translates to:
  /// **'en'**
  String get and;

  /// No description provided for @termsLink.
  ///
  /// In nl, this message translates to:
  /// **'Voorwaarden'**
  String get termsLink;

  /// No description provided for @privacyLink.
  ///
  /// In nl, this message translates to:
  /// **'Privacyverklaring'**
  String get privacyLink;

  /// No description provided for @errorNetwork.
  ///
  /// In nl, this message translates to:
  /// **'Geen verbinding. Controleer je internet en probeer het opnieuw.'**
  String get errorNetwork;

  /// No description provided for @errorGeneric.
  ///
  /// In nl, this message translates to:
  /// **'Er ging iets mis. Probeer het opnieuw.'**
  String get errorGeneric;

  /// No description provided for @retry.
  ///
  /// In nl, this message translates to:
  /// **'Opnieuw proberen'**
  String get retry;

  /// No description provided for @greetingNight.
  ///
  /// In nl, this message translates to:
  /// **'Goedenacht'**
  String get greetingNight;

  /// No description provided for @greetingMorning.
  ///
  /// In nl, this message translates to:
  /// **'Goedemorgen'**
  String get greetingMorning;

  /// No description provided for @greetingAfternoon.
  ///
  /// In nl, this message translates to:
  /// **'Goedemiddag'**
  String get greetingAfternoon;

  /// No description provided for @greetingEvening.
  ///
  /// In nl, this message translates to:
  /// **'Goedeavond'**
  String get greetingEvening;

  /// No description provided for @greetingWithName.
  ///
  /// In nl, this message translates to:
  /// **'{greeting}, {name}'**
  String greetingWithName(String greeting, String name);

  /// No description provided for @welcome.
  ///
  /// In nl, this message translates to:
  /// **'Welkom'**
  String get welcome;

  /// No description provided for @welcomeName.
  ///
  /// In nl, this message translates to:
  /// **'Welkom, {name}'**
  String welcomeName(String name);

  /// No description provided for @overviewSubtitleEmpty.
  ///
  /// In nl, this message translates to:
  /// **'Voeg je eerste abonnement toe om je totaal te zien.'**
  String get overviewSubtitleEmpty;

  /// No description provided for @overviewSubtitle.
  ///
  /// In nl, this message translates to:
  /// **'Zo staan je abonnementen er nu voor.'**
  String get overviewSubtitle;

  /// No description provided for @statPerMonth.
  ///
  /// In nl, this message translates to:
  /// **'Per maand'**
  String get statPerMonth;

  /// No description provided for @statPerYear.
  ///
  /// In nl, this message translates to:
  /// **'Per jaar'**
  String get statPerYear;

  /// No description provided for @statSubscriptions.
  ///
  /// In nl, this message translates to:
  /// **'Abonnementen'**
  String get statSubscriptions;

  /// No description provided for @other.
  ///
  /// In nl, this message translates to:
  /// **'Overig'**
  String get other;

  /// No description provided for @listTitle.
  ///
  /// In nl, this message translates to:
  /// **'Abonnementen'**
  String get listTitle;

  /// No description provided for @sortMostExpensive.
  ///
  /// In nl, this message translates to:
  /// **'Duurste eerst'**
  String get sortMostExpensive;

  /// No description provided for @sortCheapest.
  ///
  /// In nl, this message translates to:
  /// **'Goedkoopste eerst'**
  String get sortCheapest;

  /// No description provided for @sortName.
  ///
  /// In nl, this message translates to:
  /// **'Op naam'**
  String get sortName;

  /// No description provided for @sortNewest.
  ///
  /// In nl, this message translates to:
  /// **'Nieuwste eerst'**
  String get sortNewest;

  /// No description provided for @add.
  ///
  /// In nl, this message translates to:
  /// **'Toevoegen'**
  String get add;

  /// No description provided for @emptyTitle.
  ///
  /// In nl, this message translates to:
  /// **'Nog geen abonnementen'**
  String get emptyTitle;

  /// No description provided for @emptyBody.
  ///
  /// In nl, this message translates to:
  /// **'Voeg je eerste abonnement toe en zie meteen wat je per maand kwijt bent.'**
  String get emptyBody;

  /// No description provided for @emptyAddButton.
  ///
  /// In nl, this message translates to:
  /// **'Abonnement toevoegen'**
  String get emptyAddButton;

  /// No description provided for @emptyPopular.
  ///
  /// In nl, this message translates to:
  /// **'Of begin met een populaire dienst'**
  String get emptyPopular;

  /// No description provided for @percentOfTotal.
  ///
  /// In nl, this message translates to:
  /// **'{percent}% van je totaal'**
  String percentOfTotal(int percent);

  /// No description provided for @perMonthLower.
  ///
  /// In nl, this message translates to:
  /// **'per maand'**
  String get perMonthLower;

  /// No description provided for @edit.
  ///
  /// In nl, this message translates to:
  /// **'Bewerken'**
  String get edit;

  /// No description provided for @delete.
  ///
  /// In nl, this message translates to:
  /// **'Verwijderen'**
  String get delete;

  /// No description provided for @cancel.
  ///
  /// In nl, this message translates to:
  /// **'Annuleer'**
  String get cancel;

  /// No description provided for @deleteConfirmTitle.
  ///
  /// In nl, this message translates to:
  /// **'{name} verwijderen?'**
  String deleteConfirmTitle(String name);

  /// No description provided for @deleteConfirmBody.
  ///
  /// In nl, this message translates to:
  /// **'Dit abonnement verdwijnt uit je overzicht.'**
  String get deleteConfirmBody;

  /// No description provided for @deleted.
  ///
  /// In nl, this message translates to:
  /// **'Verwijderd'**
  String get deleted;

  /// No description provided for @addedName.
  ///
  /// In nl, this message translates to:
  /// **'{name} toegevoegd'**
  String addedName(String name);

  /// No description provided for @saved.
  ///
  /// In nl, this message translates to:
  /// **'Opgeslagen'**
  String get saved;

  /// No description provided for @usageCount.
  ///
  /// In nl, this message translates to:
  /// **'{used} van {limit} gratis abonnementen'**
  String usageCount(int used, int limit);

  /// No description provided for @usageFull.
  ///
  /// In nl, this message translates to:
  /// **'Alle {limit} gratis plekken gebruikt'**
  String usageFull(int limit);

  /// No description provided for @unlimited.
  ///
  /// In nl, this message translates to:
  /// **'Onbeperkt'**
  String get unlimited;

  /// No description provided for @periodMonthly.
  ///
  /// In nl, this message translates to:
  /// **'Per maand'**
  String get periodMonthly;

  /// No description provided for @periodYearly.
  ///
  /// In nl, this message translates to:
  /// **'Per jaar'**
  String get periodYearly;

  /// No description provided for @periodQuarterly.
  ///
  /// In nl, this message translates to:
  /// **'Per kwartaal'**
  String get periodQuarterly;

  /// No description provided for @periodWeekly.
  ///
  /// In nl, this message translates to:
  /// **'Per week'**
  String get periodWeekly;

  /// No description provided for @periodMonthlyShort.
  ///
  /// In nl, this message translates to:
  /// **'per maand'**
  String get periodMonthlyShort;

  /// No description provided for @periodYearlyShort.
  ///
  /// In nl, this message translates to:
  /// **'per jaar'**
  String get periodYearlyShort;

  /// No description provided for @periodQuarterlyShort.
  ///
  /// In nl, this message translates to:
  /// **'per kwartaal'**
  String get periodQuarterlyShort;

  /// No description provided for @periodWeeklyShort.
  ///
  /// In nl, this message translates to:
  /// **'per week'**
  String get periodWeeklyShort;

  /// No description provided for @addTitle.
  ///
  /// In nl, this message translates to:
  /// **'Abonnement toevoegen'**
  String get addTitle;

  /// No description provided for @customTitle.
  ///
  /// In nl, this message translates to:
  /// **'Eigen abonnement'**
  String get customTitle;

  /// No description provided for @editTitle.
  ///
  /// In nl, this message translates to:
  /// **'Abonnement bewerken'**
  String get editTitle;

  /// No description provided for @searchHint.
  ///
  /// In nl, this message translates to:
  /// **'Zoek tussen {count} diensten, bijv. Spotify'**
  String searchHint(int count);

  /// No description provided for @customAddQuery.
  ///
  /// In nl, this message translates to:
  /// **'“{query}” zelf toevoegen'**
  String customAddQuery(String query);

  /// No description provided for @customAdd.
  ///
  /// In nl, this message translates to:
  /// **'Eigen abonnement toevoegen'**
  String get customAdd;

  /// No description provided for @customAddBody.
  ///
  /// In nl, this message translates to:
  /// **'Staat je dienst er niet bij? Vul naam en prijs zelf in.'**
  String get customAddBody;

  /// No description provided for @popular.
  ///
  /// In nl, this message translates to:
  /// **'Populair'**
  String get popular;

  /// No description provided for @noResults.
  ///
  /// In nl, this message translates to:
  /// **'Geen dienst gevonden voor “{query}”. Voeg \'m hierboven zelf toe.'**
  String noResults(String query);

  /// No description provided for @backToSearch.
  ///
  /// In nl, this message translates to:
  /// **'Terug naar zoeken'**
  String get backToSearch;

  /// No description provided for @plansCount.
  ///
  /// In nl, this message translates to:
  /// **'{count, plural, =1{1 pakket} other{{count} pakketten}}'**
  String plansCount(int count);

  /// No description provided for @formName.
  ///
  /// In nl, this message translates to:
  /// **'Naam'**
  String get formName;

  /// No description provided for @formPlan.
  ///
  /// In nl, this message translates to:
  /// **'Pakket (optioneel)'**
  String get formPlan;

  /// No description provided for @formPlanHint.
  ///
  /// In nl, this message translates to:
  /// **'bijv. Family'**
  String get formPlanHint;

  /// No description provided for @formPrice.
  ///
  /// In nl, this message translates to:
  /// **'Prijs (€)'**
  String get formPrice;

  /// No description provided for @formPeriod.
  ///
  /// In nl, this message translates to:
  /// **'Periode'**
  String get formPeriod;

  /// No description provided for @formCategory.
  ///
  /// In nl, this message translates to:
  /// **'Categorie (optioneel)'**
  String get formCategory;

  /// No description provided for @formCategoryHint.
  ///
  /// In nl, this message translates to:
  /// **'bijv. Streaming'**
  String get formCategoryHint;

  /// No description provided for @formPriceInvalid.
  ///
  /// In nl, this message translates to:
  /// **'Vul een geldige prijs in.'**
  String get formPriceInvalid;

  /// No description provided for @save.
  ///
  /// In nl, this message translates to:
  /// **'Opslaan'**
  String get save;

  /// No description provided for @premium.
  ///
  /// In nl, this message translates to:
  /// **'Premium'**
  String get premium;

  /// No description provided for @paywallHeadline1.
  ///
  /// In nl, this message translates to:
  /// **'Gratis beginnen.'**
  String get paywallHeadline1;

  /// No description provided for @paywallHeadline2.
  ///
  /// In nl, this message translates to:
  /// **'Onbeperkt met Premium.'**
  String get paywallHeadline2;

  /// No description provided for @paywallLimitTitle.
  ///
  /// In nl, this message translates to:
  /// **'Limiet bereikt'**
  String get paywallLimitTitle;

  /// No description provided for @paywallLimitBody.
  ///
  /// In nl, this message translates to:
  /// **'Met een gratis account houd je {limit} abonnementen bij. Met Premium voeg je er zoveel toe als je wilt.'**
  String paywallLimitBody(int limit);

  /// No description provided for @paywallBody.
  ///
  /// In nl, this message translates to:
  /// **'Gratis houd je {limit} abonnementen bij. Premium haalt die grens weg.'**
  String paywallBody(int limit);

  /// No description provided for @perkUnlimited.
  ///
  /// In nl, this message translates to:
  /// **'Onbeperkt abonnementen bijhouden'**
  String get perkUnlimited;

  /// No description provided for @perkExport.
  ///
  /// In nl, this message translates to:
  /// **'Exporteer je overzicht naar Excel (CSV)'**
  String get perkExport;

  /// No description provided for @perkEverywhere.
  ///
  /// In nl, this message translates to:
  /// **'Werkt op de website én in de app'**
  String get perkEverywhere;

  /// No description provided for @perkSupport.
  ///
  /// In nl, this message translates to:
  /// **'Steun een onafhankelijke maker'**
  String get perkSupport;

  /// No description provided for @planYearly.
  ///
  /// In nl, this message translates to:
  /// **'Per jaar'**
  String get planYearly;

  /// No description provided for @planMonthly.
  ///
  /// In nl, this message translates to:
  /// **'Per maand'**
  String get planMonthly;

  /// No description provided for @bestValue.
  ///
  /// In nl, this message translates to:
  /// **'Voordeligst'**
  String get bestValue;

  /// No description provided for @buyPremium.
  ///
  /// In nl, this message translates to:
  /// **'Neem Premium'**
  String get buyPremium;

  /// No description provided for @restorePurchases.
  ///
  /// In nl, this message translates to:
  /// **'Aankopen herstellen'**
  String get restorePurchases;

  /// No description provided for @paywallLegal.
  ///
  /// In nl, this message translates to:
  /// **'Premium verlengt automatisch tot je opzegt. Opzeggen kan altijd in de instellingen van de App Store of Google Play.'**
  String get paywallLegal;

  /// No description provided for @purchaseSuccess.
  ///
  /// In nl, this message translates to:
  /// **'Welkom bij Premium!'**
  String get purchaseSuccess;

  /// No description provided for @restoreNone.
  ///
  /// In nl, this message translates to:
  /// **'Geen eerdere aankopen gevonden.'**
  String get restoreNone;

  /// No description provided for @restoreSuccess.
  ///
  /// In nl, this message translates to:
  /// **'Je aankopen zijn hersteld.'**
  String get restoreSuccess;

  /// No description provided for @storeUnavailable.
  ///
  /// In nl, this message translates to:
  /// **'Aankopen zijn nu niet beschikbaar. Probeer het later opnieuw.'**
  String get storeUnavailable;

  /// No description provided for @youArePremium.
  ///
  /// In nl, this message translates to:
  /// **'Je hebt Premium. Bedankt voor je steun!'**
  String get youArePremium;

  /// No description provided for @settingsTitle.
  ///
  /// In nl, this message translates to:
  /// **'Instellingen'**
  String get settingsTitle;

  /// No description provided for @account.
  ///
  /// In nl, this message translates to:
  /// **'Account'**
  String get account;

  /// No description provided for @language.
  ///
  /// In nl, this message translates to:
  /// **'Taal'**
  String get language;

  /// No description provided for @languageSystem.
  ///
  /// In nl, this message translates to:
  /// **'Systeemtaal'**
  String get languageSystem;

  /// No description provided for @plan.
  ///
  /// In nl, this message translates to:
  /// **'Abonnement'**
  String get plan;

  /// No description provided for @planFree.
  ///
  /// In nl, this message translates to:
  /// **'Gratis'**
  String get planFree;

  /// No description provided for @manageSubscription.
  ///
  /// In nl, this message translates to:
  /// **'Abonnement beheren'**
  String get manageSubscription;

  /// No description provided for @premiumViaWeb.
  ///
  /// In nl, this message translates to:
  /// **'Je hebt Premium via de website. Beheer het op abonnementenbeheren.com.'**
  String get premiumViaWeb;

  /// No description provided for @premiumGranted.
  ///
  /// In nl, this message translates to:
  /// **'Je hebt Premium cadeau gekregen.'**
  String get premiumGranted;

  /// No description provided for @exportCsv.
  ///
  /// In nl, this message translates to:
  /// **'Exporteer als CSV'**
  String get exportCsv;

  /// No description provided for @logout.
  ///
  /// In nl, this message translates to:
  /// **'Uitloggen'**
  String get logout;

  /// No description provided for @deleteAccount.
  ///
  /// In nl, this message translates to:
  /// **'Account verwijderen'**
  String get deleteAccount;

  /// No description provided for @deleteAccountBody.
  ///
  /// In nl, this message translates to:
  /// **'Je account en al je abonnementen worden definitief verwijderd. Dit kun je niet ongedaan maken.'**
  String get deleteAccountBody;

  /// No description provided for @deleteAccountStoreNote.
  ///
  /// In nl, this message translates to:
  /// **'Heb je Premium in de app gekocht? Zeg het dan ook op in de App Store of Google Play.'**
  String get deleteAccountStoreNote;

  /// No description provided for @accountDeleted.
  ///
  /// In nl, this message translates to:
  /// **'Je account is verwijderd.'**
  String get accountDeleted;

  /// No description provided for @viewOffer.
  ///
  /// In nl, this message translates to:
  /// **'Bekijk aanbieding'**
  String get viewOffer;

  /// No description provided for @termsOfUse.
  ///
  /// In nl, this message translates to:
  /// **'Gebruiksvoorwaarden (EULA)'**
  String get termsOfUse;

  /// No description provided for @paywallMonthlyPer.
  ///
  /// In nl, this message translates to:
  /// **'{price} per maand'**
  String paywallMonthlyPer(String price);

  /// No description provided for @legal.
  ///
  /// In nl, this message translates to:
  /// **'Over'**
  String get legal;

  /// No description provided for @catAiSoftware.
  ///
  /// In nl, this message translates to:
  /// **'AI & Software'**
  String get catAiSoftware;

  /// No description provided for @catStreaming.
  ///
  /// In nl, this message translates to:
  /// **'Streaming'**
  String get catStreaming;

  /// No description provided for @catNews.
  ///
  /// In nl, this message translates to:
  /// **'Nieuws & Tijdschriften'**
  String get catNews;

  /// No description provided for @catGaming.
  ///
  /// In nl, this message translates to:
  /// **'Gaming'**
  String get catGaming;

  /// No description provided for @catSport.
  ///
  /// In nl, this message translates to:
  /// **'Sport'**
  String get catSport;

  /// No description provided for @catMobile.
  ///
  /// In nl, this message translates to:
  /// **'Mobiel'**
  String get catMobile;

  /// No description provided for @catAppsLifestyle.
  ///
  /// In nl, this message translates to:
  /// **'Apps & Lifestyle'**
  String get catAppsLifestyle;

  /// No description provided for @catInternetTv.
  ///
  /// In nl, this message translates to:
  /// **'Internet & TV'**
  String get catInternetTv;

  /// No description provided for @catMusic.
  ///
  /// In nl, this message translates to:
  /// **'Muziek'**
  String get catMusic;

  /// No description provided for @catOutings.
  ///
  /// In nl, this message translates to:
  /// **'Uitjes & Cultuur'**
  String get catOutings;

  /// No description provided for @catMobility.
  ///
  /// In nl, this message translates to:
  /// **'Mobiliteit'**
  String get catMobility;

  /// No description provided for @catBooks.
  ///
  /// In nl, this message translates to:
  /// **'Boeken'**
  String get catBooks;

  /// No description provided for @catFood.
  ///
  /// In nl, this message translates to:
  /// **'Eten & Bezorging'**
  String get catFood;
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>['de', 'en', 'es', 'fr', 'nl'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'de':
      return AppLocalizationsDe();
    case 'en':
      return AppLocalizationsEn();
    case 'es':
      return AppLocalizationsEs();
    case 'fr':
      return AppLocalizationsFr();
    case 'nl':
      return AppLocalizationsNl();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
