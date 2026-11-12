import 'dart:io' show Platform;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/config.dart';
import '../../core/theme.dart';
import '../../data/models.dart';
import '../../premium/purchase_service.dart';
import '../../state/providers.dart';
import '../l10n_helpers.dart';
import '../widgets/common.dart';

enum PaywallReason { limit, export, manual }

Future<void> openPaywall(BuildContext context, {required PaywallReason reason}) {
  return Navigator.of(context)
      .push(MaterialPageRoute(fullscreenDialog: true, builder: (_) => PaywallScreen(reason: reason)));
}

/// Premium-scherm in de stijl van /premium op de site, met aankopen via
/// de App Store / Google Play (RevenueCat).
class PaywallScreen extends ConsumerStatefulWidget {
  const PaywallScreen({super.key, required this.reason});
  final PaywallReason reason;

  @override
  ConsumerState<PaywallScreen> createState() => _PaywallScreenState();
}

class _PaywallScreenState extends ConsumerState<PaywallScreen> {
  Offering? _offering;
  var _loadingOffering = true;
  Package? _selected;
  var _busy = false;

  PurchaseService get _purchases => ref.read(purchaseServiceProvider);

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final offering = await _purchases.currentOffering();
    if (!mounted) return;
    setState(() {
      _offering = offering;
      _selected = offering?.annual ?? offering?.monthly ?? offering?.availablePackages.firstOrNull;
      _loadingOffering = false;
    });
  }

  Future<void> _buy() async {
    final l = context.l10n;
    final pkg = _selected;
    if (pkg == null || _busy) return;
    setState(() => _busy = true);
    final outcome = await _purchases.purchase(pkg);
    if (!mounted) return;
    if (outcome == PurchaseOutcome.success) {
      await ref.read(sessionProvider.notifier).syncPremium();
      if (!mounted) return;
      Navigator.of(context).pop();
      showToast(context, l.purchaseSuccess);
      return;
    }
    setState(() => _busy = false);
    if (outcome == PurchaseOutcome.failed || outcome == PurchaseOutcome.unavailable) {
      showToast(context, l.storeUnavailable);
    }
  }

  Future<void> _restore() async {
    final l = context.l10n;
    if (_busy) return;
    setState(() => _busy = true);
    final restored = await _purchases.restore();
    final entitlement = await ref.read(sessionProvider.notifier).syncPremium();
    if (!mounted) return;
    setState(() => _busy = false);
    if (restored == null) {
      showToast(context, l.storeUnavailable);
    } else if (restored || (entitlement?.isPremium ?? false)) {
      Navigator.of(context).pop();
      showToast(context, l.restoreSuccess);
    } else {
      showToast(context, l.restoreNone);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final session = ref.watch(sessionProvider).value;
    final entitlement = session?.entitlement ?? Entitlement.unlimited;
    final freeLimit = entitlement.limit ?? 5;

    final (title, body) = switch (widget.reason) {
      PaywallReason.limit => (l.paywallLimitTitle, l.paywallLimitBody(freeLimit)),
      _ => (null, l.paywallBody(freeLimit)),
    };

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              color: AppColors.navy,
              padding: const EdgeInsets.only(bottom: 88),
              child: SafeArea(
                bottom: false,
                child: Column(
                  children: [
                    Align(
                      alignment: Alignment.centerRight,
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Material(
                          color: Colors.white.withValues(alpha: 0.08),
                          shape: const CircleBorder(),
                          child: InkWell(
                            customBorder: const CircleBorder(),
                            onTap: () => Navigator.of(context).pop(),
                            child: const SizedBox(
                              width: 40,
                              height: 40,
                              child: Icon(LucideIcons.x, size: 18, color: Colors.white),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 24),
                      child: Column(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                            decoration: BoxDecoration(
                              color: AppColors.mint.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(999),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(LucideIcons.sparkles, size: 16, color: AppColors.mintLight),
                                const SizedBox(width: 6),
                                Text(
                                  title ?? l.premium,
                                  style: sans(14, color: AppColors.mintLight, weight: FontWeight.w700),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 18),
                          Text(
                            l.paywallHeadline1,
                            textAlign: TextAlign.center,
                            style: display(30, color: Colors.white, height: 1.05),
                          ),
                          Text(
                            l.paywallHeadline2,
                            textAlign: TextAlign.center,
                            style: display(30, color: AppColors.mint, height: 1.1),
                          ),
                          const SizedBox(height: 14),
                          Text(
                            body,
                            textAlign: TextAlign.center,
                            style: sans(15.5, color: AppColors.haze, height: 1.5),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Transform.translate(
              offset: const Offset(0, -64),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Container(
                  padding: const EdgeInsets.all(22),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(28),
                    border: Border.all(color: AppColors.mint, width: 2),
                    boxShadow: floatShadow,
                  ),
                  child: entitlement.isPremium
                      ? _AlreadyPremium(entitlement: entitlement)
                      : Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            _Perks(),
                            const SizedBox(height: 22),
                            ..._planOptions(context),
                            const SizedBox(height: 14),
                            MintButton(
                              label: _busy ? l.busy : l.buyPremium,
                              icon: LucideIcons.sparkles,
                              loading: _busy,
                              onPressed: _selected == null ? null : _buy,
                            ),
                            const SizedBox(height: 6),
                            TextButton(
                              onPressed: _busy || !_purchases.available ? null : _restore,
                              child: Text(
                                l.restorePurchases,
                                style: sans(14, color: AppColors.slate600, weight: FontWeight.w600),
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              l.paywallLegal,
                              textAlign: TextAlign.center,
                              style: sans(12.5, color: AppColors.slate500, height: 1.5),
                            ),
                            const SizedBox(height: 10),
                            _LegalLinks(),
                          ],
                        ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<Widget> _planOptions(BuildContext context) {
    final l = context.l10n;
    if (_loadingOffering) {
      return const [
        Padding(
          padding: EdgeInsets.symmetric(vertical: 24),
          child: Center(child: CircularProgressIndicator()),
        ),
      ];
    }
    final offering = _offering;
    if (offering == null || offering.availablePackages.isEmpty) {
      return [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(18)),
          child: Text(
            l.storeUnavailable,
            textAlign: TextAlign.center,
            style: sans(14, color: AppColors.slate600),
          ),
        ),
      ];
    }
    final packages = [
      ?offering.annual,
      ?offering.monthly,
      ...offering.availablePackages.where((p) => p != offering.annual && p != offering.monthly),
    ];
    return [
      for (final p in packages) ...[
        _PlanOption(
          title: switch (p.packageType) {
            PackageType.annual => l.planYearly,
            PackageType.monthly => l.planMonthly,
            _ => p.storeProduct.title,
          },
          price: p.storeProduct.priceString,
          suffix: switch (p.packageType) {
            PackageType.annual => l.periodYearlyShort,
            PackageType.monthly => l.periodMonthlyShort,
            _ => null,
          },
          note: p.packageType == PackageType.annual && p.storeProduct.price > 0
              ? l.paywallMonthlyPer(_monthlyEquivalent(p))
              : null,
          badge: p.packageType == PackageType.annual ? l.bestValue : null,
          selected: _selected == p,
          onTap: () => setState(() => _selected = p),
        ),
        const SizedBox(height: 10),
      ],
    ];
  }

  String _monthlyEquivalent(Package p) {
    final perMonth = p.storeProduct.price / 12;
    final lang = context.lang;
    return NumberFormat.simpleCurrency(
      locale: lang == 'nl' ? 'nl_NL' : lang,
      name: p.storeProduct.currencyCode,
    ).format(perMonth);
  }
}

class _Perks extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final perks = [l.perkUnlimited, l.perkExport, l.perkEverywhere, l.perkSupport];
    return Column(
      children: [
        for (final perk in perks)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 20,
                  height: 20,
                  margin: const EdgeInsets.only(top: 1),
                  decoration: const BoxDecoration(color: AppColors.mintSoft, shape: BoxShape.circle),
                  child: const Icon(LucideIcons.check, size: 12, color: AppColors.brand),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(perk, style: sans(15, color: AppColors.slate700)),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _PlanOption extends StatelessWidget {
  const _PlanOption({
    required this.title,
    required this.price,
    required this.selected,
    required this.onTap,
    this.suffix,
    this.note,
    this.badge,
  });

  final String title;
  final String price;
  final String? suffix;
  final String? note;
  final String? badge;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      selected: selected,
      button: true,
      child: Material(
        color: selected ? AppColors.mintWash : Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: BorderSide(color: selected ? AppColors.mint : AppColors.line, width: 1.5),
        ),
        child: InkWell(
          borderRadius: BorderRadius.circular(18),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            child: Row(
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: selected ? AppColors.mint : Colors.transparent,
                    shape: BoxShape.circle,
                    border: Border.all(color: selected ? AppColors.mint : AppColors.slate300, width: 2),
                  ),
                  child: selected ? const Icon(LucideIcons.check, size: 14, color: AppColors.mintInk) : null,
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Wrap(
                        spacing: 8,
                        runSpacing: 4,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        children: [
                          Text(title, style: sans(15, weight: FontWeight.w700)),
                          if (badge != null)
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(color: AppColors.navy, borderRadius: BorderRadius.circular(99)),
                              child: Text(
                                badge!.toUpperCase(),
                                style: sans(
                                  10.5,
                                  color: AppColors.mintLight,
                                  weight: FontWeight.w700,
                                ).copyWith(letterSpacing: 0.4),
                              ),
                            ),
                        ],
                      ),
                      if (note != null) ...[
                        const SizedBox(height: 2),
                        Text(note!, style: sans(12.5, color: AppColors.slate500)),
                      ],
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(price, style: display(18)),
                    if (suffix != null) Text(suffix!, style: sans(12, color: AppColors.slate500)),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _AlreadyPremium extends StatelessWidget {
  const _AlreadyPremium({required this.entitlement});
  final Entitlement entitlement;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(color: AppColors.mintWash, borderRadius: BorderRadius.circular(18)),
          child: Row(
            children: [
              const Icon(LucideIcons.check, size: 20, color: AppColors.brand),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  l.youArePremium,
                  style: sans(15, color: AppColors.mintText, weight: FontWeight.w600),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        _Perks(),
        const SizedBox(height: 16),
        if (entitlement.source == PremiumSource.store)
          OutlineButtonX(label: l.manageSubscription, onPressed: openStoreSubscriptions)
        else if (entitlement.source == PremiumSource.stripe)
          Text(
            l.premiumViaWeb,
            textAlign: TextAlign.center,
            style: sans(14, color: AppColors.slate500, height: 1.5),
          )
        else if (entitlement.source == PremiumSource.granted)
          Text(
            l.premiumGranted,
            textAlign: TextAlign.center,
            style: sans(14, color: AppColors.slate500),
          ),
      ],
    );
  }
}

class _LegalLinks extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    Widget link(String label, Uri url) => TextButton(
      onPressed: () => launchUrl(url),
      style: TextButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 6), minimumSize: Size.zero),
      child: Text(
        label,
        style: sans(12.5, color: AppColors.brand, weight: FontWeight.w600),
      ),
    );
    return Wrap(
      alignment: WrapAlignment.center,
      children: [
        link(l.termsOfUse, AppConfig.appleEulaUrl),
        link(l.termsLink, AppConfig.termsUrl),
        link(l.privacyLink, AppConfig.privacyUrl),
      ],
    );
  }
}

/// Opent het abonnementenoverzicht van de App Store of Google Play.
Future<void> openStoreSubscriptions() async {
  final url = !_isAndroid
      ? Uri.parse('https://apps.apple.com/account/subscriptions')
      : Uri.parse('https://play.google.com/store/account/subscriptions');
  await launchUrl(url, mode: LaunchMode.externalApplication);
}

bool get _isAndroid {
  try {
    return Platform.isAndroid;
  } catch (_) {
    return false;
  }
}
