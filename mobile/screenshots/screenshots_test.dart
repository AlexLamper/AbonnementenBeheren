// ignore_for_file: invalid_use_of_visible_for_testing_member
// Maakt schermafbeeldingen van de app met de echte lettertypes, handig om
// de stijl te controleren en als basis voor App Store-screenshots.
//
//   flutter test screenshots --update-goldens
//
// De PNG's komen in screenshots/goldens/ (niet in git).
import 'package:abonnementenbeheren/data/api_client.dart';
import 'package:abonnementenbeheren/main.dart';
import 'package:abonnementenbeheren/state/providers.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';
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

Future<void> _pump(WidgetTester tester, FakeBackend backend, {String? token, String lang = 'nl'}) async {
  FlutterSecureStorage.setMockInitialValues({'ab_token': ?token});
  SharedPreferences.setMockInitialValues({'ab_locale': lang});
  final prefs = await SharedPreferences.getInstance();
  tester.view.physicalSize = const Size(390 * 2, 844 * 2);
  tester.view.devicePixelRatio = 2;
  tester.view.padding = const FakeViewPadding(top: 47 * 2, bottom: 34 * 2);
  addTearDown(tester.view.reset);
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        sharedPrefsProvider.overrideWithValue(prefs),
        apiClientProvider.overrideWithValue(ApiClient(client: backend.client, baseUrl: 'https://test')),
      ],
      child: const AbonnementenApp(),
    ),
  );
  await tester.pumpAndSettle();
}

Future<void> _shot(String name) => expectLater(find.byType(AbonnementenApp), matchesGoldenFile('goldens/$name.png'));

void main() {
  setUpAll(_loadFonts);

  testWidgets('login', (tester) async {
    await _pump(tester, FakeBackend());
    await _shot('01_login_nl');
  });

  testWidgets('overzicht gratis', (tester) async {
    await _pump(tester, FakeBackend(subs: FakeBackend.sampleSubs()), token: 'tok');
    await _shot('02_overzicht_nl');
    await tester.tap(find.text('Toevoegen'));
    await tester.pumpAndSettle();
    await _shot('03_premium_limiet_nl');
  });

  testWidgets('overzicht leeg', (tester) async {
    await _pump(tester, FakeBackend(), token: 'tok');
    await _shot('04_leeg_nl');
    await tester.tap(find.text('Abonnement toevoegen'));
    await tester.pumpAndSettle();
    await _shot('05_toevoegen_nl');
    await tester.enterText(find.byType(TextField).first, 'netflix');
    await tester.pumpAndSettle();
    await _shot('06_zoeken_nl');
  });

  testWidgets('engels premium', (tester) async {
    await _pump(
      tester,
      FakeBackend(premium: true, subs: FakeBackend.sampleSubs()),
      token: 'tok',
      lang: 'en',
    );
    await _shot('07_overview_en');
  });

  testWidgets('duits instellingen', (tester) async {
    await _pump(
      tester,
      FakeBackend(subs: FakeBackend.sampleSubs()),
      token: 'tok',
      lang: 'de',
    );
    await _shot('08_overview_de');
    await tester.tap(find.byIcon(LucideIcons.settings));
    await tester.pumpAndSettle();
    await _shot('09_einstellungen_de');
  });
}
