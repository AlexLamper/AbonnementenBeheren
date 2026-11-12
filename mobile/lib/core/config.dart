import 'dart:io' show Platform;

/// Instellingen die bij het bouwen worden meegegeven met --dart-define.
class AppConfig {
  AppConfig._();

  /// De website is ook de API. Lokaal testen: --dart-define=API_BASE_URL=http://10.0.2.2:3000
  static const apiBaseUrl = String.fromEnvironment('API_BASE_URL', defaultValue: 'https://www.abonnementenbeheren.com');

  static const _revenueCatAppleKey = String.fromEnvironment('REVENUECAT_APPLE_KEY');
  static const _revenueCatGoogleKey = String.fromEnvironment('REVENUECAT_GOOGLE_KEY');

  /// RevenueCat public SDK key voor dit platform, of leeg als die ontbreekt.
  static String get revenueCatKey {
    try {
      if (Platform.isIOS || Platform.isMacOS) return _revenueCatAppleKey;
      if (Platform.isAndroid) return _revenueCatGoogleKey;
    } catch (_) {
      // Web/tests: geen Platform.
    }
    return '';
  }

  /// Moet gelijk zijn aan REVENUECAT_PREMIUM_ENTITLEMENT_ID op de server.
  static const premiumEntitlement = 'premium';

  static Uri site(String path) => Uri.parse('$apiBaseUrl$path');

  static final privacyUrl = site('/privacy');
  static final termsUrl = site('/voorwaarden');
  static final premiumUrl = site('/premium');
  static final appleEulaUrl = Uri.parse('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/');
}
