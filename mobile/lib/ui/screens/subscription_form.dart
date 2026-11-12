import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/money.dart';
import '../../core/theme.dart';
import '../../data/api_client.dart';
import '../../data/models.dart';
import '../l10n_helpers.dart';
import '../widgets/common.dart';

/// Formulier voor een eigen abonnement of bewerken (SubscriptionForm.tsx).
class SubscriptionFormSheet extends StatelessWidget {
  const SubscriptionFormSheet({
    super.key,
    required this.title,
    required this.submitLabel,
    required this.onSubmit,
    this.initial,
    this.initialName,
    this.footer,
  });

  final String title;
  final String submitLabel;
  final Future<void> Function(SubscriptionInput input) onSubmit;
  final Subscription? initial;
  final String? initialName;
  final Widget? footer;

  @override
  Widget build(BuildContext context) => SingleChildScrollView(
    padding: const EdgeInsets.fromLTRB(20, 20, 20, 28),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        SheetHeader(title: title),
        SubscriptionForm(initial: initial, initialName: initialName, submitLabel: submitLabel, onSubmit: onSubmit),
        ?footer,
      ],
    ),
  );
}

class SubscriptionForm extends ConsumerStatefulWidget {
  const SubscriptionForm({
    super.key,
    required this.submitLabel,
    required this.onSubmit,
    this.initial,
    this.initialName,
  });

  final String submitLabel;
  final Future<void> Function(SubscriptionInput input) onSubmit;
  final Subscription? initial;
  final String? initialName;

  @override
  ConsumerState<SubscriptionForm> createState() => _SubscriptionFormState();
}

class _SubscriptionFormState extends ConsumerState<SubscriptionForm> {
  late final _name = TextEditingController(text: widget.initial?.name ?? widget.initialName ?? '');
  late final _plan = TextEditingController(text: widget.initial?.planName ?? '');
  final _price = TextEditingController();
  var _priceInitialized = false;
  late final _category = TextEditingController(text: widget.initial?.category ?? '');
  late var _period = widget.initial?.billingPeriod ?? BillingPeriod.maandelijks;
  String? _nameError, _priceError;
  var _loading = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_priceInitialized && widget.initial != null) {
      // Decimaalteken van de taal: 9,99 (nl/de/fr/es) of 9.99 (en).
      final text = widget.initial!.price.toStringAsFixed(2);
      _price.text = context.lang == 'en' ? text : text.replaceAll('.', ',');
    }
    _priceInitialized = true;
  }

  @override
  void dispose() {
    _name.dispose();
    _plan.dispose();
    _price.dispose();
    _category.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final l = context.l10n;
    final price = parsePrice(_price.text);
    setState(() {
      _nameError = _name.text.trim().isEmpty ? l.errorNameRequired : null;
      _priceError = price == null ? l.formPriceInvalid : null;
    });
    if (_nameError != null || price == null) return;

    setState(() => _loading = true);
    try {
      await widget.onSubmit(
        SubscriptionInput(
          name: _name.text.trim(),
          planName: _plan.text.trim(),
          price: price,
          billingPeriod: _period,
          category: _category.text.trim(),
          presetId: widget.initial?.presetId,
          logoUrl: widget.initial?.logoUrl,
          color: widget.initial?.color,
        ),
      );
    } on ApiException catch (e) {
      if (mounted && !e.isLimitReached) {
        showToast(context, e.isNetwork ? l.errorNetwork : l.errorGeneric);
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final parsed = parsePrice(_price.text);
    final preview = parsed != null && parsed > 0
        ? (_period == BillingPeriod.maandelijks ? toYearly(parsed, _period) : toMonthly(parsed, _period))
        : null;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        AppTextField(
          label: l.formName,
          controller: _name,
          error: _nameError,
          textCapitalization: TextCapitalization.sentences,
          textInputAction: TextInputAction.next,
        ),
        const SizedBox(height: 16),
        AppTextField(label: l.formPlan, hint: l.formPlanHint, controller: _plan, textInputAction: TextInputAction.next),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: AppTextField(
                label: l.formPrice,
                hint: '9,99',
                controller: _price,
                error: _priceError,
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                onChanged: (_) => setState(() {}),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    l.formPeriod,
                    style: sans(14, color: AppColors.slate700, weight: FontWeight.w600),
                  ),
                  const SizedBox(height: 6),
                  DropdownButtonFormField<BillingPeriod>(
                    initialValue: _period,
                    isExpanded: true,
                    borderRadius: BorderRadius.circular(14),
                    dropdownColor: Colors.white,
                    style: sans(15),
                    decoration: inputDecoration(),
                    items: [
                      for (final p in BillingPeriod.values)
                        DropdownMenuItem(
                          value: p,
                          child: Text(p.label(l), overflow: TextOverflow.ellipsis),
                        ),
                    ],
                    onChanged: (p) => setState(() => _period = p ?? _period),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        AppTextField(
          label: l.formCategory,
          hint: l.formCategoryHint,
          controller: _category,
          textCapitalization: TextCapitalization.sentences,
        ),
        if (preview != null) ...[
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(color: AppColors.mintWash, borderRadius: BorderRadius.circular(14)),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    _period == BillingPeriod.maandelijks ? l.statPerYear : l.statPerMonth,
                    style: sans(14, color: AppColors.mintText),
                  ),
                ),
                Text(context.eur(preview), style: display(15, color: AppColors.mintText)),
              ],
            ),
          ),
        ],
        const SizedBox(height: 20),
        MintButton(label: _loading ? l.busy : widget.submitLabel, loading: _loading, onPressed: _submit),
      ],
    );
  }
}
