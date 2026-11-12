import 'package:intl/intl.dart';

/// Factuurperiode. De waarden zijn de Nederlandse sleutels die de server
/// opslaat; de app toont ze vertaald.
enum BillingPeriod {
  maandelijks,
  jaarlijks,
  kwartaal,
  wekelijks;

  static BillingPeriod parse(String? value) =>
      BillingPeriod.values.firstWhere((p) => p.name == value, orElse: () => BillingPeriod.maandelijks);
}

double toMonthly(double price, BillingPeriod period) => switch (period) {
  BillingPeriod.maandelijks => price,
  BillingPeriod.jaarlijks => price / 12,
  BillingPeriod.kwartaal => price / 3,
  BillingPeriod.wekelijks => price * 52 / 12,
};

double toYearly(double price, BillingPeriod period) => switch (period) {
  BillingPeriod.maandelijks => price * 12,
  BillingPeriod.jaarlijks => price,
  BillingPeriod.kwartaal => price * 4,
  BillingPeriod.wekelijks => price * 52,
};

/// Euro-bedrag in de notatie van de gekozen taal (€ 9,99 / €9.99 / 9,99 €).
String formatEur(double amount, String locale) {
  final format = NumberFormat.currency(locale: locale == 'nl' ? 'nl_NL' : locale, symbol: '€', decimalDigits: 2);
  return format.format(amount);
}

/// "9,99" of "9.99" naar een getal.
double? parsePrice(String input) {
  final cleaned = input.trim().replaceAll('€', '').replaceAll(' ', '').replaceAll(',', '.');
  if (cleaned.isEmpty) return null;
  final value = double.tryParse(cleaned);
  if (value == null || value < 0 || value > 100000) return null;
  return value;
}
