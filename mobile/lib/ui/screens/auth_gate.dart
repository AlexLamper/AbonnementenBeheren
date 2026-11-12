import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/theme.dart';
import '../../state/providers.dart';
import '../l10n_helpers.dart';
import '../widgets/common.dart';
import '../widgets/donut.dart';
import 'login_screen.dart';
import 'overview_screen.dart';

/// Kiest tussen inloggen en het overzicht op basis van de sessie.
class AuthGate extends ConsumerWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final session = ref.watch(sessionProvider);
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 250),
      child: switch (session) {
        AsyncData(:final value) when value == null => const LoginScreen(key: ValueKey('login')),
        AsyncData() => const OverviewScreen(key: ValueKey('overview')),
        AsyncError() => _StartupError(onRetry: () => ref.invalidate(sessionProvider)),
        _ => const _Splash(),
      },
    );
  }
}

class _Splash extends StatelessWidget {
  const _Splash();

  @override
  Widget build(BuildContext context) => const Scaffold(
    backgroundColor: AppColors.navy,
    body: Center(child: LogoMark(size: 72)),
  );
}

class _StartupError extends StatelessWidget {
  const _StartupError({required this.onRetry});
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    return Scaffold(
      backgroundColor: AppColors.navy,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const LogoMark(size: 64),
              const SizedBox(height: 24),
              Text(
                l.errorNetwork,
                textAlign: TextAlign.center,
                style: sans(16, color: AppColors.mist, height: 1.5),
              ),
              const SizedBox(height: 24),
              MintButton(label: l.retry, onPressed: onRetry, expand: false),
            ],
          ),
        ),
      ),
    );
  }
}
