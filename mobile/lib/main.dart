import 'package:cupertino_ui/cupertino_ui.dart' show GlobalCupertinoLocalizations;
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart' show GlobalWidgetsLocalizations;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'core/theme.dart';
import 'l10n/app_localizations.dart';
import 'premium/purchase_service.dart';
import 'state/providers.dart';
import 'ui/screens/auth_gate.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light);

  final prefs = await SharedPreferences.getInstance();
  final purchases = PurchaseService();
  await purchases.init();

  runApp(
    ProviderScope(
      overrides: [sharedPrefsProvider.overrideWithValue(prefs), purchaseServiceProvider.overrideWithValue(purchases)],
      child: const AbonnementenApp(),
    ),
  );
}

class AbonnementenApp extends ConsumerWidget {
  const AbonnementenApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    return MaterialApp(
      title: 'AbonnementenBeheren',
      debugShowCheckedModeBanner: false,
      theme: buildTheme(),
      locale: locale,
      supportedLocales: AppLocalizations.supportedLocales,
      // De gegenereerde lijst gebruikt nog de oude Material-vertalingen;
      // material_ui en cupertino_ui hebben hun eigen typen.
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      // Onbekende talen vallen terug op Engels; Nederlands blijft Nederlands.
      localeResolutionCallback: (device, supported) {
        if (device == null) return const Locale('nl');
        for (final l in supported) {
          if (l.languageCode == device.languageCode) return l;
        }
        return const Locale('en');
      },
      home: const AuthGate(),
    );
  }
}
