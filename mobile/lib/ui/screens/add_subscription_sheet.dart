import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/theme.dart';
import '../../data/api_client.dart';
import '../../data/models.dart';
import '../../state/providers.dart';
import '../l10n_helpers.dart';
import '../widgets/common.dart';
import '../widgets/service_logo.dart';
import 'paywall_screen.dart';
import 'subscription_form.dart';

Future<void> showAddSubscriptionSheet(BuildContext context, {String? initialQuery}) async {
  final limitHit = await showAppSheet<bool>(context, (_) => AddSubscriptionSheet(initialQuery: initialQuery));
  // De server weigerde: gratis limiet bereikt. Toon dan de upgrade.
  if (limitHit == true && context.mounted) {
    await openPaywall(context, reason: PaywallReason.limit);
  }
}

/// Zoeken in de diensten of zelf toevoegen (AddSubscriptionDialog.tsx).
class AddSubscriptionSheet extends ConsumerStatefulWidget {
  const AddSubscriptionSheet({super.key, this.initialQuery});
  final String? initialQuery;

  @override
  ConsumerState<AddSubscriptionSheet> createState() => _AddSubscriptionSheetState();
}

class _AddSubscriptionSheetState extends ConsumerState<AddSubscriptionSheet> {
  late final _query = TextEditingController(text: widget.initialQuery ?? '');
  var _custom = false;
  var _busy = false;

  @override
  void dispose() {
    _query.dispose();
    super.dispose();
  }

  Future<void> _add(SubscriptionInput input) async {
    final l = context.l10n;
    final messenger = ScaffoldMessenger.of(context);
    try {
      final created = await ref.read(subscriptionsProvider.notifier).add(input);
      if (!mounted) return;
      Navigator.of(context).pop(false);
      messenger
        ..hideCurrentSnackBar()
        ..showSnackBar(SnackBar(content: Text(l.addedName(created.name))));
    } on ApiException catch (e) {
      if (!mounted) return;
      if (e.isLimitReached) {
        Navigator.of(context).pop(true);
        return;
      }
      rethrow;
    }
  }

  Future<void> _pick(Preset preset, PresetPlan plan) async {
    if (_busy) return;
    setState(() => _busy = true);
    try {
      await _add(
        SubscriptionInput(
          name: preset.name,
          planName: plan.name,
          price: plan.price,
          billingPeriod: plan.billingPeriod,
          category: preset.category,
          presetId: preset.id,
          logoUrl: preset.logoUrl,
          color: preset.color,
        ),
      );
    } on ApiException catch (e) {
      if (mounted) showToast(context, e.isNetwork ? context.l10n.errorNetwork : context.l10n.errorGeneric);
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final q = _query.text.trim();

    if (_custom) {
      return SubscriptionFormSheet(
        title: l.customTitle,
        submitLabel: l.add,
        initialName: q.isEmpty ? null : q,
        onSubmit: _add,
        footer: Padding(
          padding: const EdgeInsets.only(top: 12),
          child: TextButton.icon(
            onPressed: () => setState(() => _custom = false),
            icon: const Icon(LucideIcons.arrowLeft, size: 16, color: AppColors.slate600),
            label: Text(
              l.backToSearch,
              style: sans(14, color: AppColors.slate600, weight: FontWeight.w600),
            ),
          ),
        ),
      );
    }

    final catalog = ref.watch(presetsProvider);
    final height = MediaQuery.sizeOf(context).height * 0.86;

    return SizedBox(
      height: height,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SheetHeader(title: l.addTitle),
            // Zoekbalk
            TextField(
              controller: _query,
              autofocus: widget.initialQuery == null,
              onChanged: (_) => setState(() {}),
              textInputAction: TextInputAction.search,
              style: sans(16),
              decoration: InputDecoration(
                hintText: l.searchHint(catalog.value?.presets.length ?? 0),
                hintStyle: sans(15, color: AppColors.slate400),
                prefixIcon: const Icon(LucideIcons.search, size: 18, color: AppColors.slate500),
                filled: true,
                fillColor: Colors.white,
                contentPadding: const EdgeInsets.symmetric(vertical: 14),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(999),
                  borderSide: const BorderSide(color: AppColors.slate300),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(999),
                  borderSide: const BorderSide(color: AppColors.mint, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 14),
            _CustomAddCard(query: q, onTap: () => setState(() => _custom = true)),
            const SizedBox(height: 14),
            Expanded(
              child: catalog.when(
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (_, _) => Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        l.errorNetwork,
                        textAlign: TextAlign.center,
                        style: sans(14, color: AppColors.slate500),
                      ),
                      const SizedBox(height: 12),
                      MintButton(label: l.retry, onPressed: () => ref.invalidate(presetsProvider), expand: false),
                    ],
                  ),
                ),
                data: (c) {
                  final results = q.isEmpty ? c.popular() : c.search(q);
                  return ListView(
                    padding: const EdgeInsets.only(bottom: 28),
                    children: [
                      if (q.isEmpty)
                        Padding(padding: const EdgeInsets.only(left: 4, bottom: 10), child: Eyebrow(l.popular)),
                      for (final p in results)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: PresetResult(
                            key: ValueKey(p.id),
                            preset: p,
                            onPick: _pick,
                            defaultOpen: q.isNotEmpty && results.length == 1,
                          ),
                        ),
                      if (q.isNotEmpty && results.isEmpty)
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          child: Text(
                            l.noResults(q),
                            textAlign: TextAlign.center,
                            style: sans(14, color: AppColors.slate500),
                          ),
                        ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CustomAddCard extends StatelessWidget {
  const _CustomAddCard({required this.query, required this.onTap});
  final String query;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    return Material(
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: AppColors.dashed, width: 1.5),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: const BoxDecoration(color: AppColors.mintSoft, shape: BoxShape.circle),
                child: const Icon(LucideIcons.plus, size: 16, color: AppColors.brand),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      query.isEmpty ? l.customAdd : l.customAddQuery(query),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: sans(14, weight: FontWeight.w600),
                    ),
                    Text(l.customAddBody, style: sans(13, color: AppColors.slate500)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Eén dienst in de zoeklijst; klapt uit bij meerdere pakketten (PresetResult.tsx).
class PresetResult extends StatefulWidget {
  const PresetResult({super.key, required this.preset, required this.onPick, this.defaultOpen = false});
  final Preset preset;
  final void Function(Preset, PresetPlan) onPick;
  final bool defaultOpen;

  @override
  State<PresetResult> createState() => _PresetResultState();
}

class _PresetResultState extends State<PresetResult> {
  late var _open = widget.defaultOpen;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final p = widget.preset;
    final single = p.plans.length == 1;
    final expanded = _open && !single;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 180),
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: expanded ? AppColors.mintBorder : AppColors.line),
      ),
      child: Column(
        children: [
          Material(
            color: expanded ? AppColors.mintWash : Colors.white,
            child: InkWell(
              onTap: p.plans.isEmpty
                  ? null
                  : () => single ? widget.onPick(p, p.plans.first) : setState(() => _open = !_open),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    ServiceLogo(name: p.name, brand: p.brand, logoUrl: p.logoUrl, color: p.color, size: 42, radius: 12),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            p.name,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: sans(15, weight: FontWeight.w700),
                          ),
                          Text(
                            [categoryLabel(l, p.category), if (!single) l.plansCount(p.plans.length)].join(' · '),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: sans(13, color: AppColors.slate500),
                          ),
                        ],
                      ),
                    ),
                    if (single) ...[
                      Text(context.eur(p.plans.first.price), style: display(15)),
                      const SizedBox(width: 8),
                      const _PlusDot(),
                    ] else
                      AnimatedRotation(
                        turns: expanded ? 0.5 : 0,
                        duration: const Duration(milliseconds: 180),
                        child: const Icon(LucideIcons.chevronDown, size: 20, color: AppColors.brand),
                      ),
                  ],
                ),
              ),
            ),
          ),
          if (expanded)
            Padding(
              padding: const EdgeInsets.all(6),
              child: Column(
                children: [
                  for (final plan in p.plans)
                    InkWell(
                      borderRadius: BorderRadius.circular(14),
                      onTap: () => widget.onPick(p, plan),
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(16, 12, 10, 12),
                        child: Row(
                          children: [
                            Expanded(
                              child: Text(
                                plan.name,
                                style: sans(15, color: AppColors.slate800, weight: FontWeight.w600),
                              ),
                            ),
                            Text(context.eur(plan.price), style: display(15)),
                            const SizedBox(width: 8),
                            Text(plan.billingPeriod.short(l), style: sans(13, color: AppColors.slate500)),
                            const SizedBox(width: 10),
                            const _PlusDot(),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          if (p.affiliateUrl != null && (single || expanded))
            Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                border: Border(top: BorderSide(color: Color(0xFFDDF0EC))),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              child: GestureDetector(
                onTap: () => launchUrl(Uri.parse(p.affiliateUrl!), mode: LaunchMode.externalApplication),
                child: Row(
                  children: [
                    Text(
                      l.viewOffer,
                      style: sans(13, color: AppColors.brand, weight: FontWeight.w600),
                    ),
                    const SizedBox(width: 6),
                    const Icon(LucideIcons.externalLink, size: 14, color: AppColors.brand),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _PlusDot extends StatelessWidget {
  const _PlusDot();

  @override
  Widget build(BuildContext context) => Container(
    width: 28,
    height: 28,
    decoration: const BoxDecoration(color: AppColors.mintSoft, shape: BoxShape.circle),
    child: const Icon(LucideIcons.plus, size: 14, color: AppColors.brand),
  );
}
