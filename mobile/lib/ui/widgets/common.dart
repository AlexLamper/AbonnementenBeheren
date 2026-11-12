import 'package:lucide_icons_flutter/lucide_icons.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/theme.dart';

/// Primaire knop: mint met mint-ink tekst, volledig rond (rounded-full).
class MintButton extends StatelessWidget {
  const MintButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.loading = false,
    this.height = 50,
    this.expand = true,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool loading;
  final double height;
  final bool expand;

  @override
  Widget build(BuildContext context) {
    final enabled = onPressed != null && !loading;
    final child = Row(
      mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (icon != null) ...[Icon(icon, size: 18, color: AppColors.mintInk), const SizedBox(width: 8)],
        Flexible(
          child: Text(
            label,
            overflow: TextOverflow.ellipsis,
            style: sans(15, color: AppColors.mintInk, weight: FontWeight.w700),
          ),
        ),
      ],
    );
    return Opacity(
      opacity: enabled ? 1 : 0.5,
      child: Material(
        color: AppColors.mint,
        shape: const StadiumBorder(),
        child: InkWell(
          customBorder: const StadiumBorder(),
          onTap: enabled ? onPressed : null,
          highlightColor: AppColors.mintLight.withValues(alpha: 0.5),
          child: SizedBox(
            height: height,
            child: Padding(padding: const EdgeInsets.symmetric(horizontal: 20), child: child),
          ),
        ),
      ),
    );
  }
}

/// Secundaire knop met rand (border-slate-300).
class OutlineButtonX extends StatelessWidget {
  const OutlineButtonX({super.key, required this.label, required this.onPressed, this.icon, this.color});
  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final fg = color ?? AppColors.slate900;
    return Material(
      color: Colors.white,
      shape: const StadiumBorder(side: BorderSide(color: AppColors.slate300)),
      child: InkWell(
        customBorder: const StadiumBorder(),
        onTap: onPressed,
        child: SizedBox(
          height: 50,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (icon != null) ...[Icon(icon, size: 18, color: fg), const SizedBox(width: 8)],
              Text(
                label,
                style: sans(15, color: fg, weight: FontWeight.w600),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Invoerveld zoals op de site: h-12, rounded-[14px], mint focusring.
class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    required this.label,
    required this.controller,
    this.hint,
    this.error,
    this.obscure = false,
    this.keyboardType,
    this.autofillHints,
    this.textInputAction,
    this.onChanged,
    this.onSubmitted,
    this.autofocus = false,
    this.textCapitalization = TextCapitalization.none,
  });

  final String label;
  final TextEditingController controller;
  final String? hint;
  final String? error;
  final bool obscure;
  final TextInputType? keyboardType;
  final Iterable<String>? autofillHints;
  final TextInputAction? textInputAction;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final bool autofocus;
  final TextCapitalization textCapitalization;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: sans(14, color: AppColors.slate700, weight: FontWeight.w600),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: controller,
          obscureText: obscure,
          keyboardType: keyboardType,
          autofillHints: autofillHints,
          textInputAction: textInputAction,
          onChanged: onChanged,
          onSubmitted: onSubmitted,
          autofocus: autofocus,
          textCapitalization: textCapitalization,
          style: sans(15),
          decoration: inputDecoration(hint: hint, error: error),
        ),
        if (error != null) ...[
          const SizedBox(height: 6),
          Text(error!, style: sans(14, color: const Color(0xFFB91C1C))),
        ],
      ],
    );
  }
}

InputDecoration inputDecoration({String? hint, String? error, Widget? prefix}) {
  OutlineInputBorder border(Color c, [double w = 1]) => OutlineInputBorder(
    borderRadius: BorderRadius.circular(14),
    borderSide: BorderSide(color: c, width: w),
  );
  final hasError = error != null;
  return InputDecoration(
    hintText: hint,
    hintStyle: sans(15, color: AppColors.slate400),
    filled: true,
    fillColor: Colors.white,
    isDense: true,
    prefixIcon: prefix,
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    enabledBorder: border(hasError ? AppColors.red600 : AppColors.slate300),
    focusedBorder: border(hasError ? AppColors.red600 : AppColors.mint, 2),
    border: border(AppColors.slate300),
  );
}

/// Kop van een bottom sheet: titel + ronde sluitknop (Modal.tsx).
class SheetHeader extends StatelessWidget {
  const SheetHeader({super.key, required this.title, this.leading, this.onClose});
  final String title;
  final Widget? leading;
  final VoidCallback? onClose;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        children: [
          if (leading != null) ...[leading!, const SizedBox(width: 12)],
          Expanded(
            child: Text(title, maxLines: 1, overflow: TextOverflow.ellipsis, style: display(22)),
          ),
          const SizedBox(width: 12),
          Material(
            color: AppColors.surface,
            shape: const CircleBorder(),
            child: InkWell(
              customBorder: const CircleBorder(),
              onTap: onClose ?? () => Navigator.of(context).maybePop(),
              child: const SizedBox(
                width: 40,
                height: 40,
                child: Icon(LucideIcons.x, size: 18, color: AppColors.slate600),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Opent een sheet in de stijl van de modals op de site (rounded-t-[28px]).
Future<T?> showAppSheet<T>(BuildContext context, WidgetBuilder builder) {
  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    showDragHandle: false,
    shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
    builder: (ctx) => Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(ctx).bottom),
      child: builder(ctx),
    ),
  );
}

void showToast(BuildContext context, String message) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(SnackBar(content: Text(message)));
}

/// Kleine hoofdletter-kop (text-xs font-bold uppercase tracking-[0.12em] text-brand).
class Eyebrow extends StatelessWidget {
  const Eyebrow(this.text, {super.key, this.color = AppColors.brand});
  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) => Text(
    text.toUpperCase(),
    style: sans(12, color: color, weight: FontWeight.w700).copyWith(letterSpacing: 1.4),
  );
}
