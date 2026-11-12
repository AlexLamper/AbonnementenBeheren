import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';

import '../../core/theme.dart';
import '../../data/api_client.dart';
import '../../data/models.dart';
import '../../state/providers.dart';
import '../l10n_helpers.dart';
import '../widgets/common.dart';
import '../widgets/donut.dart';
import '../widgets/service_logo.dart';
import 'add_subscription_sheet.dart';
import 'paywall_screen.dart';
import 'settings_screen.dart';
import 'subscription_form.dart';

enum SortKey { mostExpensive, cheapest, name, newest }

class OverviewScreen extends ConsumerStatefulWidget {
  const OverviewScreen({super.key});

  @override
  ConsumerState<OverviewScreen> createState() => _OverviewScreenState();
}

class _OverviewScreenState extends ConsumerState<OverviewScreen> {
  var _sort = SortKey.mostExpensive;

  Session get _session => ref.read(sessionProvider).value!;

  Future<void> _openAdd({String? query}) async {
    final entitlement = _session.entitlement;
    if (!entitlement.canAdd) {
      await openPaywall(context, reason: PaywallReason.limit);
      return;
    }
    await showAddSubscriptionSheet(context, initialQuery: query);
  }

  Future<void> _exportCsv() async {
    final l = context.l10n;
    final entitlement = _session.entitlement;
    if (entitlement.premiumEnabled && !entitlement.isPremium) {
      await openPaywall(context, reason: PaywallReason.export);
      return;
    }
    try {
      final csv = await ref.read(apiClientProvider).getText('/api/export');
      final dir = await getTemporaryDirectory();
      final file = File('${dir.path}/abonnementen.csv');
      await file.writeAsString(csv);
      await SharePlus.instance.share(ShareParams(files: [XFile(file.path, mimeType: 'text/csv')]));
    } catch (_) {
      if (mounted) showToast(context, l.errorGeneric);
    }
  }

  Future<void> _delete(Subscription s) async {
    final l = context.l10n;
    try {
      await ref.read(subscriptionsProvider.notifier).remove(s.id);
      if (mounted) showToast(context, l.deleted);
    } catch (_) {
      if (mounted) showToast(context, l.errorGeneric);
    }
  }

  Future<void> _edit(Subscription s) async {
    await showAppSheet(
      context,
      (ctx) => SubscriptionFormSheet(
        title: ctx.l10n.editTitle,
        submitLabel: ctx.l10n.save,
        initial: s,
        onSubmit: (input) async {
          await ref.read(subscriptionsProvider.notifier).edit(s.id, input);
          if (ctx.mounted) Navigator.of(ctx).pop();
          if (mounted) showToast(context, context.l10n.saved);
        },
      ),
    );
  }

  List<Subscription> _sorted(List<Subscription> items) {
    final list = [...items];
    switch (_sort) {
      case SortKey.mostExpensive:
        list.sort((a, b) => b.monthly.compareTo(a.monthly));
      case SortKey.cheapest:
        list.sort((a, b) => a.monthly.compareTo(b.monthly));
      case SortKey.name:
        list.sort((a, b) => a.name.toLowerCase().compareTo(b.name.toLowerCase()));
      case SortKey.newest:
        break; // server levert al nieuwste eerst
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final session = ref.watch(sessionProvider).value;
    if (session == null) return const SizedBox.shrink();
    final subs = ref.watch(subscriptionsProvider);
    final items = subs.value ?? const <Subscription>[];
    final entitlement = session.entitlement;
    final monthly = items.fold<double>(0, (s, i) => s + i.monthly);
    final yearly = items.fold<double>(0, (s, i) => s + i.yearly);
    final isEmpty = items.isEmpty;

    return Scaffold(
      backgroundColor: AppColors.background,
      floatingActionButton: !isEmpty && subs.hasValue ? _AddFab(label: l.add, onPressed: () => _openAdd()) : null,
      body: RefreshIndicator(
        color: AppColors.brand,
        onRefresh: () async {
          await Future.wait([
            ref.read(subscriptionsProvider.notifier).reload(),
            ref.read(sessionProvider.notifier).refresh(),
          ]);
        },
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          slivers: [
            // Eén sliver: de viewport tekent slivers in omgekeerde volgorde,
            // dus de kaart moet in dezelfde Column staan om over de navy
            // band heen te vallen (zoals -mt-[72px] op de site).
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _NavyBand(session: session, isEmpty: isEmpty, monthly: monthly, yearly: yearly, items: items),
                  Transform.translate(
                    offset: const Offset(0, -72),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: AppColors.line),
                          boxShadow: floatShadow,
                        ),
                        padding: const EdgeInsets.all(16),
                        child: switch (subs) {
                          AsyncError() when !subs.hasValue => _LoadError(
                            onRetry: () => ref.read(subscriptionsProvider.notifier).reload(),
                          ),
                          _ when !subs.hasValue => const Padding(
                            padding: EdgeInsets.symmetric(vertical: 48),
                            child: Center(child: CircularProgressIndicator()),
                          ),
                          _ when isEmpty => _EmptyState(onAdd: _openAdd),
                          _ => Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: FittedBox(
                                      fit: BoxFit.scaleDown,
                                      alignment: Alignment.centerLeft,
                                      child: Text.rich(
                                        TextSpan(
                                          text: '${l.listTitle} ',
                                          children: [
                                            TextSpan(
                                              text: '(${items.length})',
                                              style: display(20, color: AppColors.slate500, weight: FontWeight.w500),
                                            ),
                                          ],
                                        ),
                                        style: display(20),
                                        maxLines: 1,
                                      ),
                                    ),
                                  ),
                                  if (entitlement.premiumEnabled) ...[
                                    _CircleIconButton(
                                      icon: LucideIcons.download,
                                      onTap: _exportCsv,
                                      tooltip: l.exportCsv,
                                    ),
                                    const SizedBox(width: 8),
                                  ],
                                  _SortButton(value: _sort, onChanged: (v) => setState(() => _sort = v)),
                                ],
                              ),
                              const SizedBox(height: 12),
                              for (final (i, s) in _sorted(items).indexed)
                                SubscriptionTile(
                                  key: ValueKey(s.id),
                                  item: s,
                                  share: monthly > 0 ? s.monthly / monthly : 0,
                                  index: i,
                                  onEdit: () => _edit(s),
                                  onDelete: () => _delete(s),
                                ),
                            ],
                          ),
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 40)),
          ],
        ),
      ),
    );
  }
}

// ── Navy band: kop, begroeting, limiet en totalen ───────────────────────

class _NavyBand extends ConsumerWidget {
  const _NavyBand({
    required this.session,
    required this.isEmpty,
    required this.monthly,
    required this.yearly,
    required this.items,
  });

  final Session session;
  final bool isEmpty;
  final double monthly;
  final double yearly;
  final List<Subscription> items;

  String _greeting(BuildContext context) {
    final l = context.l10n;
    final h = DateTime.now().hour;
    return h < 6
        ? l.greetingNight
        : h < 12
        ? l.greetingMorning
        : h < 18
        ? l.greetingAfternoon
        : l.greetingEvening;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l = context.l10n;
    final first = session.user.firstName;
    final e = session.entitlement;
    final title = isEmpty
        ? (first.isEmpty ? l.welcome : l.welcomeName(first))
        : (first.isEmpty ? _greeting(context) : l.greetingWithName(_greeting(context), first));

    return Container(
      color: AppColors.navy,
      padding: const EdgeInsets.only(bottom: 96),
      child: SafeArea(
        bottom: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // App-kop
            Container(
              height: 64,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: Color(0x14FFFFFF))),
              ),
              child: Row(
                children: [
                  const LogoMark(size: 34),
                  const Spacer(),
                  if (e.premiumEnabled) ...[_PremiumPill(isPremium: e.isPremium), const SizedBox(width: 8)],
                  _AvatarButton(
                    initial: first.isEmpty ? '?' : first[0].toUpperCase(),
                    onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const SettingsScreen())),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 30, 16, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: display(28, color: Colors.white)),
                  const SizedBox(height: 6),
                  Text(isEmpty ? l.overviewSubtitleEmpty : l.overviewSubtitle, style: sans(15, color: AppColors.haze)),
                  if (e.limit != null) ...[
                    const SizedBox(height: 16),
                    UsageMeter(
                      count: items.length,
                      limit: e.limit!,
                      onUpgrade: () => openPaywall(context, reason: PaywallReason.manual),
                    ),
                  ],
                  const SizedBox(height: 24),
                  TotalsCards(monthly: monthly, yearly: yearly, items: items),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PremiumPill extends StatelessWidget {
  const _PremiumPill({required this.isPremium});
  final bool isPremium;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    return Material(
      color: isPremium ? AppColors.mint.withValues(alpha: 0.15) : AppColors.mint,
      shape: const StadiumBorder(),
      child: InkWell(
        customBorder: const StadiumBorder(),
        onTap: () => openPaywall(context, reason: PaywallReason.manual),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(LucideIcons.sparkles, size: 16, color: isPremium ? AppColors.mintLight : AppColors.mintInk),
              const SizedBox(width: 6),
              Text(
                l.premium,
                style: sans(14, color: isPremium ? AppColors.mintLight : AppColors.mintInk, weight: FontWeight.w700),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _AvatarButton extends StatelessWidget {
  const _AvatarButton({required this.initial, required this.onTap});
  final String initial;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Material(
    color: Colors.white.withValues(alpha: 0.08),
    shape: const StadiumBorder(),
    child: InkWell(
      customBorder: const StadiumBorder(),
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(6, 6, 12, 6),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 30,
              height: 30,
              alignment: Alignment.center,
              decoration: const BoxDecoration(color: AppColors.mint, shape: BoxShape.circle),
              child: Text(
                initial,
                style: sans(14, color: AppColors.mintInk, weight: FontWeight.w800),
              ),
            ),
            const SizedBox(width: 8),
            const Icon(LucideIcons.settings, size: 18, color: Colors.white),
          ],
        ),
      ),
    ),
  );
}

/// "3 van 5 gratis" met een balkje (UsageMeter in OverviewClient.tsx).
class UsageMeter extends StatelessWidget {
  const UsageMeter({super.key, required this.count, required this.limit, required this.onUpgrade});
  final int count;
  final int limit;
  final VoidCallback onUpgrade;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final used = count.clamp(0, limit);
    final full = count >= limit;
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 6, 6, 6),
      decoration: BoxDecoration(
        color: AppColors.glass,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppColors.glassBorder),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  full ? l.usageFull(limit) : l.usageCount(used, limit),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: sans(13, color: AppColors.mist, weight: FontWeight.w600),
                ),
                const SizedBox(height: 5),
                ClipRRect(
                  borderRadius: BorderRadius.circular(99),
                  child: LinearProgressIndicator(
                    value: used / limit,
                    minHeight: 6,
                    backgroundColor: Colors.white.withValues(alpha: 0.1),
                    color: full ? AppColors.mintLight : AppColors.mint,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          MintButton(label: l.unlimited, onPressed: onUpgrade, expand: false, height: 36),
        ],
      ),
    );
  }
}

/// Totalen op de navy band (TotalsCards.tsx).
class TotalsCards extends StatelessWidget {
  const TotalsCards({super.key, required this.monthly, required this.yearly, required this.items});
  final double monthly;
  final double yearly;
  final List<Subscription> items;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    if (items.isEmpty) {
      return Column(
        children: [
          _EmptyStat(label: l.statPerMonth, value: context.eur(0)),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _EmptyStat(label: l.statPerYear, value: context.eur(0)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _EmptyStat(label: l.statSubscriptions, value: '0'),
              ),
            ],
          ),
        ],
      );
    }

    // Maximaal 5 eigen segmenten; de rest onder "Overig".
    final breakdown = [...items]..sort((a, b) => b.monthly.compareTo(a.monthly));
    final top = breakdown.take(5).map((s) => (s.name, s.monthly)).toList();
    final rest = breakdown.skip(5).fold<double>(0, (s, i) => s + i.monthly);
    final slices = [...top, if (rest > 0) (l.other, rest)];

    return Column(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          decoration: BoxDecoration(color: AppColors.mint, borderRadius: BorderRadius.circular(22)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                l.statPerMonth,
                style: sans(14, color: AppColors.mintText, weight: FontWeight.w600),
              ),
              const SizedBox(height: 2),
              FittedBox(
                fit: BoxFit.scaleDown,
                alignment: Alignment.centerLeft,
                child: Text(context.eur(monthly), style: display(38, color: AppColors.mintInk, height: 1.2)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _Stat(label: l.statPerYear, value: context.eur(yearly)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _Stat(label: l.statSubscriptions, value: '${items.length}'),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          decoration: BoxDecoration(
            color: AppColors.glass,
            borderRadius: BorderRadius.circular(22),
            border: Border.all(color: AppColors.glassBorder),
          ),
          child: Row(
            children: [
              Donut(
                size: 68,
                segments: [
                  for (final (i, s) in slices.indexed)
                    (monthly > 0 ? s.$2 / monthly * circumference : 0, AppColors.segments[i % 6]),
                ],
              ),
              const SizedBox(width: 18),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    for (final (i, s) in slices.take(3).indexed)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 3),
                        child: Row(
                          children: [
                            Container(
                              width: 10,
                              height: 10,
                              decoration: BoxDecoration(
                                color: AppColors.segments[i],
                                borderRadius: BorderRadius.circular(3),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                '${s.$1} · ${(s.$2 / monthly * 100).round()}%',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: sans(13, color: AppColors.mist),
                              ),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _Stat extends StatelessWidget {
  const _Stat({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    decoration: BoxDecoration(
      color: AppColors.glass,
      borderRadius: BorderRadius.circular(22),
      border: Border.all(color: AppColors.glassBorder),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: sans(13, color: AppColors.haze)),
        const SizedBox(height: 4),
        FittedBox(
          fit: BoxFit.scaleDown,
          alignment: Alignment.centerLeft,
          child: Text(value, style: display(22, color: Colors.white)),
        ),
      ],
    ),
  );
}

class _EmptyStat extends StatelessWidget {
  const _EmptyStat({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) => CustomPaint(
    painter: _DashedBorderPainter(),
    child: Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: sans(14, color: AppColors.haze)),
          const SizedBox(height: 4),
          Text(value, style: display(26, color: AppColors.navySoft)),
        ],
      ),
    ),
  );
}

class _DashedBorderPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final rrect = RRect.fromRectAndRadius(Offset.zero & size, const Radius.circular(22));
    final path = Path()..addRRect(rrect.deflate(0.75));
    final paint = Paint()
      ..color = Colors.white.withValues(alpha: 0.2)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.5;
    for (final metric in path.computeMetrics()) {
      var d = 0.0;
      while (d < metric.length) {
        canvas.drawPath(metric.extractPath(d, d + 5), paint);
        d += 9;
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ── Lijst ───────────────────────────────────────────────────────────────

class SubscriptionTile extends StatefulWidget {
  const SubscriptionTile({
    super.key,
    required this.item,
    required this.share,
    required this.index,
    required this.onEdit,
    required this.onDelete,
  });

  final Subscription item;
  final double share;
  final int index;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  @override
  State<SubscriptionTile> createState() => _SubscriptionTileState();
}

class _SubscriptionTileState extends State<SubscriptionTile> {
  var _confirming = false;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final s = widget.item;
    final subtitle = [?s.planName, '${context.eur(s.price)} ${s.billingPeriod.short(l)}'].join(' · ');

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: AppColors.rowLine)),
      ),
      child: Row(
        children: [
          ServiceLogo(name: s.name, brand: s.brand, logoUrl: s.logoUrl, color: s.color, size: 44, radius: 13),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  s.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: sans(15, weight: FontWeight.w700),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: sans(13, color: AppColors.slate500),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          if (_confirming) ...[
            Material(
              color: AppColors.red600,
              shape: const StadiumBorder(),
              child: InkWell(
                customBorder: const StadiumBorder(),
                onTap: widget.onDelete,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  child: Text(
                    l.delete,
                    style: sans(13, color: Colors.white, weight: FontWeight.w700),
                  ),
                ),
              ),
            ),
            TextButton(
              onPressed: () => setState(() => _confirming = false),
              style: TextButton.styleFrom(
                foregroundColor: AppColors.slate600,
                padding: const EdgeInsets.symmetric(horizontal: 8),
                minimumSize: Size.zero,
              ),
              child: Text(
                l.cancel,
                style: sans(13, color: AppColors.slate600, weight: FontWeight.w600),
              ),
            ),
          ] else ...[
            Text(context.eur(s.monthly), style: display(17)),
            const SizedBox(width: 8),
            _SquareIconButton(icon: LucideIcons.pencil, onTap: widget.onEdit, label: l.edit),
            const SizedBox(width: 4),
            _SquareIconButton(
              icon: LucideIcons.trash2,
              onTap: () => setState(() => _confirming = true),
              label: l.delete,
              danger: true,
            ),
          ],
        ],
      ),
    );
  }
}

class _SquareIconButton extends StatelessWidget {
  const _SquareIconButton({required this.icon, required this.onTap, required this.label, this.danger = false});
  final IconData icon;
  final VoidCallback onTap;
  final String label;
  final bool danger;

  @override
  Widget build(BuildContext context) => Semantics(
    button: true,
    label: label,
    child: Material(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: onTap,
        splashColor: danger ? AppColors.red50 : AppColors.mintSoft,
        child: SizedBox(width: 36, height: 36, child: Icon(icon, size: 16, color: AppColors.slate600)),
      ),
    ),
  );
}

class _CircleIconButton extends StatelessWidget {
  const _CircleIconButton({required this.icon, required this.onTap, required this.tooltip});
  final IconData icon;
  final VoidCallback onTap;
  final String tooltip;

  @override
  Widget build(BuildContext context) => Tooltip(
    message: tooltip,
    child: Material(
      color: Colors.white,
      shape: const CircleBorder(side: BorderSide(color: AppColors.line)),
      child: InkWell(
        customBorder: const CircleBorder(),
        onTap: onTap,
        child: SizedBox(width: 40, height: 40, child: Icon(icon, size: 16, color: AppColors.slate600)),
      ),
    ),
  );
}

class _SortButton extends StatelessWidget {
  const _SortButton({required this.value, required this.onChanged});
  final SortKey value;
  final ValueChanged<SortKey> onChanged;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    String label(SortKey k) => switch (k) {
      SortKey.mostExpensive => l.sortMostExpensive,
      SortKey.cheapest => l.sortCheapest,
      SortKey.name => l.sortName,
      SortKey.newest => l.sortNewest,
    };
    return PopupMenuButton<SortKey>(
      initialValue: value,
      onSelected: onChanged,
      color: Colors.white,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      itemBuilder: (_) => [
        for (final k in SortKey.values)
          PopupMenuItem(
            value: k,
            child: Text(label(k), style: sans(14, weight: k == value ? FontWeight.w700 : FontWeight.w500)),
          ),
      ],
      tooltip: label(value),
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
          border: Border.all(color: AppColors.line),
        ),
        child: const Icon(LucideIcons.arrowDownWideNarrow, size: 17, color: AppColors.slate600),
      ),
    );
  }
}

class _AddFab extends StatelessWidget {
  const _AddFab({required this.label, required this.onPressed});
  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: const BoxDecoration(
      borderRadius: BorderRadius.all(Radius.circular(999)),
      boxShadow: [BoxShadow(color: Color(0x9908233B), offset: Offset(0, 14), blurRadius: 30, spreadRadius: -12)],
    ),
    child: MintButton(label: label, icon: LucideIcons.plus, onPressed: onPressed, expand: false, height: 56),
  );
}

class _EmptyState extends ConsumerWidget {
  const _EmptyState({required this.onAdd});
  final void Function({String? query}) onAdd;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l = context.l10n;
    final popular = ref.watch(presetsProvider).value?.popular(5) ?? const <Preset>[];
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 4),
      child: Column(
        children: [
          const Donut(size: 72, strokeWidth: 9, trackColor: AppColors.line, segments: [(14, AppColors.mint)]),
          const SizedBox(height: 16),
          Text(l.emptyTitle, textAlign: TextAlign.center, style: display(24)),
          const SizedBox(height: 8),
          Text(
            l.emptyBody,
            textAlign: TextAlign.center,
            style: sans(15, color: AppColors.slate500, height: 1.5),
          ),
          const SizedBox(height: 22),
          MintButton(label: l.emptyAddButton, icon: LucideIcons.plus, onPressed: () => onAdd(), expand: false),
          if (popular.isNotEmpty) ...[
            const SizedBox(height: 32),
            Eyebrow(l.emptyPopular),
            const SizedBox(height: 12),
            Wrap(
              alignment: WrapAlignment.center,
              spacing: 10,
              runSpacing: 10,
              children: [
                for (final p in popular)
                  Material(
                    color: Colors.white,
                    shape: const StadiumBorder(side: BorderSide(color: AppColors.line)),
                    child: InkWell(
                      customBorder: const StadiumBorder(),
                      onTap: () => onAdd(query: p.name),
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(6, 6, 14, 6),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            ServiceLogo(name: p.name, brand: p.brand, logoUrl: p.logoUrl, color: p.color, size: 28),
                            const SizedBox(width: 10),
                            Text(p.name, style: sans(14, weight: FontWeight.w600)),
                            const SizedBox(width: 6),
                            const Icon(LucideIcons.plus, size: 14, color: AppColors.brand),
                          ],
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _LoadError extends StatelessWidget {
  const _LoadError({required this.onRetry});
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 32),
    child: Column(
      children: [
        Text(
          context.l10n.errorNetwork,
          textAlign: TextAlign.center,
          style: sans(15, color: AppColors.slate500),
        ),
        const SizedBox(height: 16),
        MintButton(label: context.l10n.retry, onPressed: onRetry, expand: false),
      ],
    ),
  );
}

/// Vertaalt een API-fout naar een melding.
String apiErrorMessage(BuildContext context, Object error) {
  final l = context.l10n;
  if (error is ApiException && error.isNetwork) return l.errorNetwork;
  return l.errorGeneric;
}
