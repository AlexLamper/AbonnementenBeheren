// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appName => 'AbonnementenBeheren';

  @override
  String get authHeroLine1 => 'In under a minute,';

  @override
  String get authHeroLine2 => 'a clear overview.';

  @override
  String get authHeroBody => 'Put all your subscriptions in one place and see what you spend per month and per year.';

  @override
  String get authWelcomeBack => 'Welcome back';

  @override
  String get authCreateTitle => 'Create your free account';

  @override
  String get authHaveAccountHint => 'Already have an account? Choose Log in above.';

  @override
  String get authNoAccountHint => 'No account yet? Choose Sign up above.';

  @override
  String get tabLogin => 'Log in';

  @override
  String get tabRegister => 'Sign up';

  @override
  String get fieldName => 'Name';

  @override
  String get fieldNameHint => 'Your name';

  @override
  String get fieldEmail => 'Email address';

  @override
  String get fieldEmailHint => 'name@example.com';

  @override
  String get fieldPassword => 'Password';

  @override
  String get fieldPasswordHintNew => 'At least 8 characters';

  @override
  String get errorNameRequired => 'Enter your name.';

  @override
  String get errorEmailInvalid => 'Enter a valid email address.';

  @override
  String get errorPasswordShort => 'Use at least 8 characters.';

  @override
  String get errorPasswordRequired => 'Enter your password.';

  @override
  String get buttonLogin => 'Log in';

  @override
  String get buttonCreateAccount => 'Create account';

  @override
  String get busy => 'Working…';

  @override
  String get authInvalidCredentials => 'Incorrect email address or password.';

  @override
  String get authNoPassword =>
      'This account signs in with Google. That isn\'t available in the app yet; please use the website.';

  @override
  String get authEmailTaken => 'An account with this email address already exists.';

  @override
  String get authAgreePrefix => 'By continuing you agree to the';

  @override
  String get and => 'and';

  @override
  String get termsLink => 'Terms';

  @override
  String get privacyLink => 'Privacy Policy';

  @override
  String get errorNetwork => 'No connection. Check your internet and try again.';

  @override
  String get errorGeneric => 'Something went wrong. Please try again.';

  @override
  String get retry => 'Try again';

  @override
  String get greetingNight => 'Good night';

  @override
  String get greetingMorning => 'Good morning';

  @override
  String get greetingAfternoon => 'Good afternoon';

  @override
  String get greetingEvening => 'Good evening';

  @override
  String greetingWithName(String greeting, String name) {
    return '$greeting, $name';
  }

  @override
  String get welcome => 'Welcome';

  @override
  String welcomeName(String name) {
    return 'Welcome, $name';
  }

  @override
  String get overviewSubtitleEmpty => 'Add your first subscription to see your total.';

  @override
  String get overviewSubtitle => 'Here\'s where your subscriptions stand.';

  @override
  String get statPerMonth => 'Per month';

  @override
  String get statPerYear => 'Per year';

  @override
  String get statSubscriptions => 'Subscriptions';

  @override
  String get other => 'Other';

  @override
  String get listTitle => 'Subscriptions';

  @override
  String get sortMostExpensive => 'Most expensive first';

  @override
  String get sortCheapest => 'Cheapest first';

  @override
  String get sortName => 'By name';

  @override
  String get sortNewest => 'Newest first';

  @override
  String get add => 'Add';

  @override
  String get emptyTitle => 'No subscriptions yet';

  @override
  String get emptyBody => 'Add your first subscription and instantly see what you spend each month.';

  @override
  String get emptyAddButton => 'Add subscription';

  @override
  String get emptyPopular => 'Or start with a popular service';

  @override
  String percentOfTotal(int percent) {
    return '$percent% of your total';
  }

  @override
  String get perMonthLower => 'per month';

  @override
  String get edit => 'Edit';

  @override
  String get delete => 'Delete';

  @override
  String get cancel => 'Cancel';

  @override
  String deleteConfirmTitle(String name) {
    return 'Delete $name?';
  }

  @override
  String get deleteConfirmBody => 'This subscription will be removed from your overview.';

  @override
  String get deleted => 'Deleted';

  @override
  String addedName(String name) {
    return '$name added';
  }

  @override
  String get saved => 'Saved';

  @override
  String usageCount(int used, int limit) {
    return '$used of $limit free subscriptions';
  }

  @override
  String usageFull(int limit) {
    return 'All $limit free spots used';
  }

  @override
  String get unlimited => 'Unlimited';

  @override
  String get periodMonthly => 'Per month';

  @override
  String get periodYearly => 'Per year';

  @override
  String get periodQuarterly => 'Per quarter';

  @override
  String get periodWeekly => 'Per week';

  @override
  String get periodMonthlyShort => 'per month';

  @override
  String get periodYearlyShort => 'per year';

  @override
  String get periodQuarterlyShort => 'per quarter';

  @override
  String get periodWeeklyShort => 'per week';

  @override
  String get addTitle => 'Add subscription';

  @override
  String get customTitle => 'Custom subscription';

  @override
  String get editTitle => 'Edit subscription';

  @override
  String searchHint(int count) {
    return 'Search $count services, e.g. Spotify';
  }

  @override
  String customAddQuery(String query) {
    return 'Add “$query” yourself';
  }

  @override
  String get customAdd => 'Add a custom subscription';

  @override
  String get customAddBody => 'Service not listed? Enter the name and price yourself.';

  @override
  String get popular => 'Popular';

  @override
  String noResults(String query) {
    return 'No service found for “$query”. Add it yourself above.';
  }

  @override
  String get backToSearch => 'Back to search';

  @override
  String plansCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(count, locale: localeName, other: '$count plans', one: '1 plan');
    return '$_temp0';
  }

  @override
  String get formName => 'Name';

  @override
  String get formPlan => 'Plan (optional)';

  @override
  String get formPlanHint => 'e.g. Family';

  @override
  String get formPrice => 'Price (€)';

  @override
  String get formPeriod => 'Billing period';

  @override
  String get formCategory => 'Category (optional)';

  @override
  String get formCategoryHint => 'e.g. Streaming';

  @override
  String get formPriceInvalid => 'Enter a valid price.';

  @override
  String get save => 'Save';

  @override
  String get premium => 'Premium';

  @override
  String get paywallHeadline1 => 'Start for free.';

  @override
  String get paywallHeadline2 => 'Unlimited with Premium.';

  @override
  String get paywallLimitTitle => 'Limit reached';

  @override
  String paywallLimitBody(int limit) {
    return 'A free account tracks $limit subscriptions. With Premium you can add as many as you like.';
  }

  @override
  String paywallBody(int limit) {
    return 'Free accounts track $limit subscriptions. Premium removes that limit.';
  }

  @override
  String get perkUnlimited => 'Track unlimited subscriptions';

  @override
  String get perkExport => 'Export your overview to Excel (CSV)';

  @override
  String get perkEverywhere => 'Works on the website and in the app';

  @override
  String get perkSupport => 'Support an independent maker';

  @override
  String get planYearly => 'Yearly';

  @override
  String get planMonthly => 'Monthly';

  @override
  String get bestValue => 'Best value';

  @override
  String get buyPremium => 'Get Premium';

  @override
  String get restorePurchases => 'Restore purchases';

  @override
  String get paywallLegal =>
      'Premium renews automatically until you cancel. You can cancel anytime in your App Store or Google Play settings.';

  @override
  String get purchaseSuccess => 'Welcome to Premium!';

  @override
  String get restoreNone => 'No previous purchases found.';

  @override
  String get restoreSuccess => 'Your purchases have been restored.';

  @override
  String get storeUnavailable => 'Purchases aren\'t available right now. Please try again later.';

  @override
  String get youArePremium => 'You have Premium. Thanks for your support!';

  @override
  String get settingsTitle => 'Settings';

  @override
  String get account => 'Account';

  @override
  String get language => 'Language';

  @override
  String get languageSystem => 'System language';

  @override
  String get plan => 'Plan';

  @override
  String get planFree => 'Free';

  @override
  String get manageSubscription => 'Manage subscription';

  @override
  String get premiumViaWeb => 'You got Premium on the website. Manage it at abonnementenbeheren.com.';

  @override
  String get premiumGranted => 'You were given Premium as a gift.';

  @override
  String get exportCsv => 'Export as CSV';

  @override
  String get logout => 'Log out';

  @override
  String get deleteAccount => 'Delete account';

  @override
  String get deleteAccountBody =>
      'Your account and all your subscriptions will be permanently deleted. This can\'t be undone.';

  @override
  String get deleteAccountStoreNote => 'Bought Premium in the app? Also cancel it in the App Store or Google Play.';

  @override
  String get accountDeleted => 'Your account has been deleted.';

  @override
  String get viewOffer => 'View offer';

  @override
  String get termsOfUse => 'Terms of Use (EULA)';

  @override
  String paywallMonthlyPer(String price) {
    return '$price per month';
  }

  @override
  String get legal => 'About';

  @override
  String get catAiSoftware => 'AI & Software';

  @override
  String get catStreaming => 'Streaming';

  @override
  String get catNews => 'News & Magazines';

  @override
  String get catGaming => 'Gaming';

  @override
  String get catSport => 'Sports';

  @override
  String get catMobile => 'Mobile';

  @override
  String get catAppsLifestyle => 'Apps & Lifestyle';

  @override
  String get catInternetTv => 'Internet & TV';

  @override
  String get catMusic => 'Music';

  @override
  String get catOutings => 'Outings & Culture';

  @override
  String get catMobility => 'Mobility';

  @override
  String get catBooks => 'Books';

  @override
  String get catFood => 'Food & Delivery';
}
