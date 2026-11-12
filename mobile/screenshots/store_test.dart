// ignore_for_file: invalid_use_of_visible_for_testing_member
// Ruwe schermen voor de App Store-screenshots (iPhone 6.9", 1320x2868 na
// compositie door tool/store_screenshots.py).
//
//   flutter test screenshots/store_test.dart --update-goldens
//
// Uitvoer: screenshots/store_raw/<taal>_<nr>.png (niet in git).
import 'package:abonnementenbeheren/data/api_client.dart';
import 'package:abonnementenbeheren/main.dart';
import 'package:abonnementenbeheren/premium/purchase_service.dart';
import 'package:abonnementenbeheren/state/providers.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:intl/intl.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../test/fake_backend.dart';

Future<void> _loadFonts() async {
  Future<void> family(String name, List<String> assets) async {
    final loader = FontLoader(name);
    for (final a in assets) {
      loader.addFont(rootBundle.load(a));
    }
    await loader.load();
  }

  await family('PlusJakartaSans', [
    for (final w in [400, 500, 600, 700, 800]) 'assets/fonts/PlusJakartaSans-$w.ttf',
  ]);
  await family('SpaceGrotesk', [
    for (final w in [500, 600, 700]) 'assets/fonts/SpaceGrotesk-$w.ttf',
  ]);
  await family('packages/lucide_icons_flutter/Lucide', ['packages/lucide_icons_flutter/assets/lucide.ttf']);
}

/// Winkel met de echte prijzen, zodat het Premium-scherm de pakketten toont.
class _FakeStore extends PurchaseService {
  _FakeStore(this.lang);

  final String lang;

  @override
  bool get available => true;

  Package _pkg(String id, PackageType type, String product, double price) {
    final fmt = NumberFormat.simpleCurrency(locale: lang == 'nl' ? 'nl_NL' : lang, name: 'EUR');
    return Package(
      id,
      type,
      StoreProduct(product, '', 'Premium', price, fmt.format(price), 'EUR'),
      const PresentedOfferingContext('default', null, null),
    );
  }

  @override
  Future<Offering?> currentOffering() async {
    final year = _pkg('annual', PackageType.annual, 'abonnementenbeheren_premium_yearly', 14.99);
    final month = _pkg('monthly', PackageType.monthly, 'abonnementenbeheren_premium_monthly', 1.99);
    return Offering('default', '', const {}, [year, month], annual: year, monthly: month);
  }
}

// Diensten met een eigen merkicoon (geen netwerk nodig in de test).
List<Map<String, dynamic>> _subs() => [
  FakeBackend.sub('1', 'Netflix', 'netflix', 'Standard', 13.99),
  FakeBackend.sub('2', 'Spotify', 'spotify', 'Duo', 17.99),
  FakeBackend.sub('3', 'YouTube Premium', 'youtubepremium', 'Individual', 13.99),
  FakeBackend.sub('4', 'PlayStation Plus', 'playstationplus', 'Essential', 71.99, period: 'jaarlijks'),
  FakeBackend.sub('5', 'iCloud+', 'icloud', '200 GB', 2.99),
  FakeBackend.sub('6', 'Ziggo', 'ziggo', 'Internet', 45),
];

const _langs = ['nl', 'en', 'de', 'fr', 'es'];

Future<void> _pump(WidgetTester tester, FakeBackend backend, String lang) async {
  FlutterSecureStorage.setMockInitialValues({'ab_token': 'tok'});
  SharedPreferences.setMockInitialValues({'ab_locale': lang});
  final prefs = await SharedPreferences.getInstance();
  // iPhone 16 Pro Max: 440x956 punten, 3x.
  tester.view.physicalSize = const Size(440 * 3, 956 * 3);
  tester.view.devicePixelRatio = 3;
  tester.view.padding = const FakeViewPadding(top: 62 * 3, bottom: 34 * 3);
  addTearDown(tester.view.reset);
  debugDefaultTargetPlatformOverride = TargetPlatform.iOS;
  addTearDown(() => debugDefaultTargetPlatformOverride = null);
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        sharedPrefsProvider.overrideWithValue(prefs),
        apiClientProvider.overrideWithValue(ApiClient(client: backend.client, baseUrl: 'https://test')),
        purchaseServiceProvider.overrideWithValue(_FakeStore(lang)),
      ],
      child: const AbonnementenApp(),
    ),
  );
  await tester.pumpAndSettle();
}

Future<void> _shot(String lang, String nr) =>
    expectLater(find.byType(AbonnementenApp), matchesGoldenFile('store_raw/${lang}_$nr.png'));

void main() {
  setUpAll(_loadFonts);

  for (final lang in _langs) {
    testWidgets('store $lang', (tester) async {
      // 1. Overzicht met totalen (Premium, dus geen limietbalk).
      await _pump(tester, FakeBackend(premium: true, subs: _subs()), lang);
      await _shot(lang, '1');

      // 2. Lijst met abonnementen.
      await tester.drag(find.byType(Scrollable).first, const Offset(0, -900));
      await tester.pumpAndSettle();
      await _shot(lang, '2');

      // 3. Toevoegen: zoeken in de lijst met diensten.
      await tester.tap(find.byIcon(LucideIcons.plus).last);
      await tester.pumpAndSettle();
      await _shot(lang, '3');

      // 4. Pakket kiezen.
      await tester.tap(find.byKey(const ValueKey('disneyplus')).first);
      await tester.pumpAndSettle();
      await _shot(lang, '4');
    });

    testWidgets('store paywall $lang', (tester) async {
      // 5. Gratis gebruiker: Premium-scherm.
      await _pump(tester, FakeBackend(subs: _subs().take(5).toList()), lang);
      await tester.tap(find.byIcon(LucideIcons.sparkles).first);
      await tester.pumpAndSettle();
      await _shot(lang, '5');
    });
  }
}
