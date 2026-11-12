import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/config.dart';
import '../../core/theme.dart';
import '../../data/models.dart';
import '../../state/providers.dart';
import '../l10n_helpers.dart';
import '../widgets/common.dart';
import 'paywall_screen.dart';

const languageNames = {'nl': 'Nederlands', 'en': 'English', 'de': 'Deutsch', 'fr': 'Français', 'es': 'Español'};

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  Future<void> _confirmDelete(BuildContext context, WidgetRef ref) async {
    final l = context.l10n;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(l.deleteAccount),
        content: Text('${l.deleteAccountBody}\n\n${l.deleteAccountStoreNote(context.storeName)}'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: Text(
              l.cancel,
              style: sans(15, color: AppColors.slate600, weight: FontWeight.w600),
            ),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: Text(
              l.delete,
              style: sans(15, color: AppColors.red600, weight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
    if (ok != true || !context.mounted) return;
    final messenger = ScaffoldMessenger.of(context);
    final navigator = Navigator.of(context);
    try {
      await ref.read(sessionProvider.notifier).deleteAccount();
      navigator.popUntil((r) => r.isFirst);
      messenger.showSnackBar(SnackBar(content: Text(l.accountDeleted)));
    } catch (_) {
      messenger.showSnackBar(SnackBar(content: Text(l.errorGeneric)));
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l = context.l10n;
    final session = ref.watch(sessionProvider).value;
    final locale = ref.watch(localeProvider);
    final e = session?.entitlement ?? Entitlement.unlimited;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.navy,
        foregroundColor: Colors.white,
        surfaceTintColor: Colors.transparent,
        title: Text(l.settingsTitle, style: display(20, color: Colors.white)),
        leading: IconButton(
          icon: const Icon(LucideIcons.arrowLeft, size: 20),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 20, 16, 40),
        children: [
          if (session != null)
            _Card(
              children: [
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        alignment: Alignment.center,
                        decoration: const BoxDecoration(color: AppColors.mint, shape: BoxShape.circle),
                        child: Text(
                          session.user.firstName.isEmpty ? '?' : session.user.firstName[0].toUpperCase(),
                          style: sans(18, color: AppColors.mintInk, weight: FontWeight.w800),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(session.user.name, style: sans(16, weight: FontWeight.w700)),
                            Text(session.user.email, style: sans(14, color: AppColors.slate500)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          if (e.premiumEnabled) ...[
            const SizedBox(height: 20),
            _SectionLabel(l.plan),
            _Card(
              children: [
                _Row(
                  icon: LucideIcons.sparkles,
                  title: e.isPremium ? l.premium : l.planFree,
                  trailing: e.isPremium
                      ? const Icon(LucideIcons.badgeCheck, size: 20, color: AppColors.brand)
                      : Text(
                          l.usageCount(e.count.clamp(0, e.limit ?? e.count), e.limit ?? 0),
                          style: sans(13, color: AppColors.slate500),
                        ),
                  onTap: () => openPaywall(context, reason: PaywallReason.manual),
                ),
                if (e.source == PremiumSource.store)
                  _Row(icon: LucideIcons.creditCard, title: l.manageSubscription, onTap: openStoreSubscriptions),
                if (e.source == PremiumSource.stripe)
                  _Row(
                    icon: LucideIcons.creditCard,
                    title: l.manageSubscription,
                    onTap: () => launchUrl(AppConfig.premiumUrl, mode: LaunchMode.externalApplication),
                  ),
              ],
            ),
          ],
          const SizedBox(height: 20),
          _SectionLabel(l.language),
          _Card(
            children: [
              _LanguageRow(code: null, label: l.languageSystem, selected: locale == null),
              for (final entry in languageNames.entries)
                _LanguageRow(code: entry.key, label: entry.value, selected: locale?.languageCode == entry.key),
            ],
          ),
          const SizedBox(height: 20),
          _SectionLabel(l.legal),
          _Card(
            children: [
              _Row(icon: LucideIcons.fileText, title: l.termsLink, onTap: () => launchUrl(AppConfig.termsUrl)),
              _Row(icon: LucideIcons.shield, title: l.privacyLink, onTap: () => launchUrl(AppConfig.privacyUrl)),
            ],
          ),
          const SizedBox(height: 20),
          _SectionLabel(l.account),
          _Card(
            children: [
              _Row(
                icon: LucideIcons.logOut,
                title: l.logout,
                onTap: () async {
                  final navigator = Navigator.of(context);
                  await ref.read(sessionProvider.notifier).logout();
                  navigator.popUntil((r) => r.isFirst);
                },
              ),
              _Row(
                icon: LucideIcons.trash2,
                title: l.deleteAccount,
                danger: true,
                onTap: () => _confirmDelete(context, ref),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  const _SectionLabel(this.text);
  final String text;

  @override
  Widget build(BuildContext context) =>
      Padding(padding: const EdgeInsets.only(left: 6, bottom: 8), child: Eyebrow(text));
}

class _Card extends StatelessWidget {
  const _Card({required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) => Container(
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(22),
      border: Border.all(color: AppColors.line),
    ),
    clipBehavior: Clip.antiAlias,
    child: Column(
      children: [
        for (final (i, c) in children.indexed) ...[
          if (i > 0) const Divider(height: 1, thickness: 1, color: AppColors.rowLine, indent: 16, endIndent: 16),
          c,
        ],
      ],
    ),
  );
}

class _Row extends StatelessWidget {
  const _Row({required this.icon, required this.title, this.onTap, this.trailing, this.danger = false});
  final IconData icon;
  final String title;
  final VoidCallback? onTap;
  final Widget? trailing;
  final bool danger;

  @override
  Widget build(BuildContext context) {
    final color = danger ? AppColors.red600 : AppColors.slate900;
    return Material(
      color: Colors.white,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 15),
          child: Row(
            children: [
              Icon(icon, size: 19, color: danger ? AppColors.red600 : AppColors.slate600),
              const SizedBox(width: 14),
              Expanded(
                child: Text(
                  title,
                  style: sans(15, color: color, weight: FontWeight.w600),
                ),
              ),
              trailing ?? const Icon(LucideIcons.chevronRight, size: 18, color: AppColors.slate400),
            ],
          ),
        ),
      ),
    );
  }
}

class _LanguageRow extends ConsumerWidget {
  const _LanguageRow({required this.code, required this.label, required this.selected});
  final String? code;
  final String label;
  final bool selected;

  @override
  Widget build(BuildContext context, WidgetRef ref) => _Row(
    icon: code == null ? LucideIcons.globe : LucideIcons.languages,
    title: label,
    trailing: selected ? const Icon(LucideIcons.check, size: 18, color: AppColors.brand) : const SizedBox(width: 18),
    onTap: () => ref.read(localeProvider.notifier).set(code),
  );
}

/// Taalkeuze op het inlogscherm: wereldbol met de huidige taalcode.
class LanguageButton extends ConsumerWidget {
  const LanguageButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final current = context.lang;
    return PopupMenuButton<String?>(
      tooltip: context.l10n.language,
      color: Colors.white,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      onSelected: (code) => ref.read(localeProvider.notifier).set(code),
      itemBuilder: (_) => [
        for (final e in languageNames.entries)
          PopupMenuItem(
            value: e.key,
            child: Text(e.value, style: sans(14, weight: e.key == current ? FontWeight.w700 : FontWeight.w500)),
          ),
      ],
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(999),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(LucideIcons.globe, size: 16, color: Colors.white),
            const SizedBox(width: 6),
            Text(
              current.toUpperCase(),
              style: sans(13, color: Colors.white, weight: FontWeight.w700),
            ),
          ],
        ),
      ),
    );
  }
}
