import 'package:material_ui/material_ui.dart';

import '../core/money.dart';
import '../l10n/app_localizations.dart';

extension L10nX on BuildContext {
  AppLocalizations get l10n => AppLocalizations.of(this);
  String get lang => Localizations.localeOf(this).languageCode;

  String eur(double amount) => formatEur(amount, lang);
}

extension PeriodL10n on BillingPeriod {
  String label(AppLocalizations l) => switch (this) {
    BillingPeriod.maandelijks => l.periodMonthly,
    BillingPeriod.jaarlijks => l.periodYearly,
    BillingPeriod.kwartaal => l.periodQuarterly,
    BillingPeriod.wekelijks => l.periodWeekly,
  };

  String short(AppLocalizations l) => switch (this) {
    BillingPeriod.maandelijks => l.periodMonthlyShort,
    BillingPeriod.jaarlijks => l.periodYearlyShort,
    BillingPeriod.kwartaal => l.periodQuarterlyShort,
    BillingPeriod.wekelijks => l.periodWeeklyShort,
  };
}

/// Categorienamen komen in het Nederlands van de server; vertaal de bekende.
String categoryLabel(AppLocalizations l, String category) => switch (category) {
  'AI & Software' => l.catAiSoftware,
  'Streaming' => l.catStreaming,
  'Nieuws & Tijdschriften' => l.catNews,
  'Gaming' => l.catGaming,
  'Sport' => l.catSport,
  'Mobiel' => l.catMobile,
  'Apps & Lifestyle' => l.catAppsLifestyle,
  'Internet & TV' => l.catInternetTv,
  'Muziek' => l.catMusic,
  'Uitjes & Cultuur' => l.catOutings,
  'Mobiliteit' => l.catMobility,
  'Boeken' => l.catBooks,
  'Eten & Bezorging' => l.catFood,
  _ => category,
};
