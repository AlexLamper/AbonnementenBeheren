import 'package:abonnementenbeheren/core/money.dart';
import 'package:abonnementenbeheren/data/api_client.dart';
import 'package:abonnementenbeheren/data/models.dart';
import 'package:abonnementenbeheren/main.dart';
import 'package:abonnementenbeheren/state/providers.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:material_ui/material_ui.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'fake_backend.dart';

/// Tekst zoeken, waarbij een harde spatie als gewone spatie telt.
Finder findText(String text) => find.byWidgetPredicate(
  (w) => w is Text && (w.data ?? w.textSpan?.toPlainText())?.replaceAll('\u00A0', ' ') == text,
);

Future<void> pumpApp(WidgetTester tester, FakeBackend backend, {String? token, String? lang}) async {
  FlutterSecureStorage.setMockInitialValues({'ab_token': ?token});
  SharedPreferences.setMockInitialValues({'ab_locale': lang ?? 'nl'});
  final prefs = await SharedPreferences.getInstance();
  tester.view.physicalSize = const Size(390 * 3, 844 * 3);
  tester.view.devicePixelRatio = 3;
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

void main() {
  group('bedragen', () {
    test('omrekenen naar maand en jaar zoals de website', () {
      expect(toMonthly(120, BillingPeriod.jaarlijks), 10);
      expect(toMonthly(30, BillingPeriod.kwartaal), 10);
      expect(toYearly(10, BillingPeriod.maandelijks), 120);
      expect(toYearly(1, BillingPeriod.wekelijks), 52);
    });

    test('prijs invoeren met komma of punt', () {
      expect(parsePrice('9,99'), 9.99);
      expect(parsePrice('€ 12.50'), 12.5);
      expect(parsePrice(''), isNull);
      expect(parsePrice('-1'), isNull);
    });

    test('euro in de notatie van de taal', () {
      expect(formatEur(1067.52, 'nl').replaceAll('\u00A0', ' '), '€ 1.067,52');
      expect(formatEur(9.99, 'en'), '€9.99');
    });
  });

  group('presets zoeken', () {
    final catalog = PresetCatalog(
      popularIds: const ['spotify'],
      presets: [
        for (final (id, name, cat) in [
          ('disneyplus', 'Disney+', 'Streaming'),
          ('spotify', 'Spotify', 'Muziek'),
          ('1password', '1Password', 'AI & Software'),
        ])
          Preset(id: id, name: name, category: cat, plans: const []),
      ],
    );

    test('"disney plus" vindt Disney+ en "1 password" vindt 1Password', () {
      expect(catalog.search('disney plus').first.id, 'disneyplus');
      expect(catalog.search('1 password').first.id, '1password');
    });

    test('populair begint met de populaire ids', () {
      expect(catalog.popular().first.id, 'spotify');
    });
  });

  testWidgets('niet ingelogd: inlogscherm, verkeerd wachtwoord geeft melding', (tester) async {
    await pumpApp(tester, FakeBackend());
    expect(find.text('Welkom terug'), findsOneWidget);

    await tester.enterText(find.byType(TextField).at(0), 'sanne@example.com');
    await tester.enterText(find.byType(TextField).at(1), 'fout');
    await tester.tap(find.text('Inloggen').last);
    await tester.pumpAndSettle();
    expect(find.text('E-mailadres of wachtwoord is onjuist.'), findsOneWidget);
  });

  testWidgets('inloggen toont het overzicht met totalen', (tester) async {
    await pumpApp(tester, FakeBackend(subs: FakeBackend.sampleSubs()));
    await tester.enterText(find.byType(TextField).at(0), 'sanne@example.com');
    await tester.enterText(find.byType(TextField).at(1), 'geheim123');
    await tester.tap(find.text('Inloggen').last);
    await tester.pumpAndSettle();

    expect(findText('€ 88,96'), findsOneWidget);
    expect(find.text('Alle 5 gratis plekken gebruikt'), findsOneWidget);
    expect(find.text('Netflix'), findsWidgets);
  });

  testWidgets('limiet bereikt: toevoegen opent Premium', (tester) async {
    await pumpApp(tester, FakeBackend(subs: FakeBackend.sampleSubs()), token: 'tok');
    await tester.tap(find.text('Toevoegen'));
    await tester.pumpAndSettle();
    expect(find.text('Limiet bereikt'), findsOneWidget);
    expect(find.text('Neem Premium'), findsOneWidget);
  });

  testWidgets('premium: dienst toevoegen via zoeken', (tester) async {
    final backend = FakeBackend(premium: true, subs: FakeBackend.sampleSubs());
    await pumpApp(tester, backend, token: 'tok');
    expect(find.textContaining('gratis'), findsNothing);

    await tester.tap(find.text('Toevoegen'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField).first, 'apple tv');
    await tester.pumpAndSettle();
    await tester.tap(find.text('Apple TV+').last);
    await tester.pumpAndSettle();
    expect(backend.subs.length, 6);
    expect(find.text('Apple TV+ toegevoegd'), findsOneWidget);
  });

  testWidgets('taal: Engels', (tester) async {
    await pumpApp(
      tester,
      FakeBackend(subs: FakeBackend.sampleSubs()),
      token: 'tok',
      lang: 'en',
    );
    expect(find.text('Per month'), findsOneWidget);
    expect(findText('€88.96'), findsOneWidget);
    expect(find.text('All 5 free spots used'), findsOneWidget);
  });
}
