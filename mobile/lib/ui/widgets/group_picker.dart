import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/theme.dart';
import '../../data/models.dart';
import '../../l10n/app_localizations.dart';
import '../../state/providers.dart';
import '../l10n_helpers.dart';

/// Voorgestelde groepen in de taal van de app; opgeslagen wordt wat je kiest.
List<String> groupSuggestions(AppLocalizations l) => [l.groupPersonal, l.groupWork, l.groupFamily];

/// Kies een groep (bijv. "Werk") of typ een nieuwe (GroupPicker.tsx).
/// Nogmaals tikken op de gekozen groep haalt hem weer weg.
class GroupPicker extends ConsumerStatefulWidget {
  const GroupPicker({super.key, required this.value, required this.onChanged, this.scroll = false});

  /// Leeg = geen groep.
  final String value;
  final ValueChanged<String> onChanged;

  /// Eén horizontaal scrollende rij in plaats van meerdere regels.
  final bool scroll;

  @override
  ConsumerState<GroupPicker> createState() => _GroupPickerState();
}

class _GroupPickerState extends ConsumerState<GroupPicker> {
  final _draft = TextEditingController();
  var _adding = false;

  @override
  void dispose() {
    _draft.dispose();
    super.dispose();
  }

  void _confirm(List<String> options) {
    if (!_adding) return;
    var g = _draft.text.trim();
    if (g.length > groupMaxLength) g = g.substring(0, groupMaxLength);
    if (g.isNotEmpty) {
      // Bestaat hij al (andere hoofdletters)? Neem dan de bestaande.
      final existing = options.where((o) => o.toLowerCase() == g.toLowerCase());
      widget.onChanged(existing.isEmpty ? g : existing.first);
    }
    _draft.clear();
    setState(() => _adding = false);
  }

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final used = ref.watch(groupsProvider);
    final options = groupOptions(groupSuggestions(l), used, widget.value.isEmpty ? null : widget.value);

    final chips = <Widget>[
      for (final g in options)
        GroupChip(
          label: g,
          selected: g == widget.value,
          showCheck: true,
          onTap: () => widget.onChanged(g == widget.value ? '' : g),
        ),
      if (_adding)
        Container(
          height: 36,
          width: 210,
          padding: const EdgeInsets.only(left: 14, right: 4),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(999),
            border: Border.all(color: AppColors.mint, width: 2),
          ),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _draft,
                  autofocus: true,
                  maxLength: groupMaxLength,
                  textCapitalization: TextCapitalization.sentences,
                  textInputAction: TextInputAction.done,
                  onSubmitted: (_) => _confirm(options),
                  onTapOutside: (_) => _confirm(options),
                  style: sans(14),
                  decoration: InputDecoration(
                    hintText: l.groupNameHint,
                    hintStyle: sans(14, color: AppColors.slate400),
                    counterText: '',
                    isDense: true,
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.zero,
                  ),
                ),
              ),
              Material(
                color: AppColors.mint,
                shape: const CircleBorder(),
                child: InkWell(
                  customBorder: const CircleBorder(),
                  onTap: () => _confirm(options),
                  child: const SizedBox(
                    width: 26,
                    height: 26,
                    child: Icon(LucideIcons.check, size: 14, color: AppColors.mintInk),
                  ),
                ),
              ),
            ],
          ),
        )
      else
        GroupChip(
          label: l.groupNew,
          icon: LucideIcons.plus,
          dashed: true,
          onTap: () => setState(() => _adding = true),
        ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          l.formGroup,
          style: sans(14, color: AppColors.slate700, weight: FontWeight.w600),
        ),
        const SizedBox(height: 8),
        if (widget.scroll)
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            clipBehavior: Clip.none,
            child: Row(
              children: [
                for (final (i, c) in chips.indexed) ...[if (i > 0) const SizedBox(width: 8), c],
              ],
            ),
          )
        else
          Wrap(spacing: 8, runSpacing: 8, children: chips),
      ],
    );
  }
}

/// Ronde chip voor groepen: mint (formulier) of navy (filter) als hij gekozen is.
class GroupChip extends StatelessWidget {
  const GroupChip({
    super.key,
    required this.label,
    required this.onTap,
    this.selected = false,
    this.showCheck = false,
    this.dark = false,
    this.dashed = false,
    this.icon,
  });

  final String label;
  final VoidCallback onTap;
  final bool selected;
  final bool showCheck;

  /// Navy in plaats van mint als hij gekozen is (filter in het overzicht).
  final bool dark;
  final bool dashed;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    final bg = selected ? (dark ? AppColors.navy : AppColors.mint) : Colors.white;
    final fg = selected
        ? (dark ? Colors.white : AppColors.mintInk)
        : dashed
        ? AppColors.brand
        : AppColors.slate700;
    final border = selected ? bg : (dashed ? AppColors.dashed : AppColors.line);
    final leading = icon ?? (selected && showCheck ? LucideIcons.check : null);

    return Semantics(
      button: true,
      selected: selected,
      child: Material(
        color: bg,
        shape: StadiumBorder(side: BorderSide(color: border, width: dashed ? 1.5 : 1.0)),
        child: InkWell(
          customBorder: const StadiumBorder(),
          onTap: onTap,
          child: Container(
            height: 36,
            padding: const EdgeInsets.symmetric(horizontal: 14),
            alignment: Alignment.center,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (leading != null) ...[Icon(leading, size: 14, color: fg), const SizedBox(width: 6)],
                Text(
                  label,
                  maxLines: 1,
                  style: sans(14, color: fg, weight: FontWeight.w600),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
