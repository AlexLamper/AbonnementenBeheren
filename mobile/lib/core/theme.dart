import 'package:material_ui/material_ui.dart';

/// Huisstijl "Mint", exact gelijk aan app/globals.css van de website.
class AppColors {
  AppColors._();

  static const background = Color(0xFFF3F7F8);
  static const foreground = Color(0xFF0F172A);
  static const navy = Color(0xFF08233B);
  static const navySoft = Color(0xFF4F6B84);
  static const mint = Color(0xFF2DD4BF);
  static const mintInk = Color(0xFF042F2E);
  static const mintLight = Color(0xFF7FE3D3);
  static const mintSoft = Color(0xFFDDF7F2);
  static const mintWash = Color(0xFFF2FBF9);
  static const mintBorder = Color(0xFF9FE6D9);
  static const mintText = Color(0xFF0B4A44);
  static const brand = Color(0xFF0F766E);
  static const teal = Color(0xFF2AA898);
  static const tealDeep = Color(0xFF1F5A6E);
  static const haze = Color(0xFFA9BFD0);
  static const mist = Color(0xFFD5E1EA);
  static const surface = Color(0xFFF3F7F8);
  static const line = Color(0xFFE2EAEE);
  static const rowLine = Color(0xFFEEF2F5);
  static const dashed = Color(0xFFC3D3DA);
  static const tabTrack = Color(0xFFE6EEF1);

  // Tailwind slate-tinten die de site gebruikt.
  static const slate900 = Color(0xFF0F172A);
  static const slate800 = Color(0xFF1E293B);
  static const slate700 = Color(0xFF334155);
  static const slate600 = Color(0xFF475569);
  static const slate500 = Color(0xFF64748B);
  static const slate400 = Color(0xFF94A3B8);
  static const slate300 = Color(0xFFCBD5E1);
  static const red600 = Color(0xFFDC2626);
  static const red50 = Color(0xFFFEF2F2);

  /// Witte vlakken op navy: bg-white/[0.06] en border-white/[0.12].
  static const glass = Color(0x0FFFFFFF);
  static const glassBorder = Color(0x1FFFFFFF);

  /// Kleuren van de donut, gelijk aan TotalsCards.tsx.
  static const segments = [
    Color(0xFF2DD4BF),
    Color(0xFF2AA898),
    Color(0xFF7FE3D3),
    Color(0xFF3F7C8C),
    Color(0xFFA7F3E6),
    Color(0xFF2A4B63),
  ];
}

class AppFonts {
  AppFonts._();
  static const sans = 'PlusJakartaSans';
  static const display = 'SpaceGrotesk';
}

/// Titels en bedragen (font-display op de site).
TextStyle display(
  double size, {
  Color color = AppColors.slate900,
  FontWeight weight = FontWeight.w700,
  double? letterSpacing,
  double? height,
}) => TextStyle(
  fontFamily: AppFonts.display,
  fontSize: size,
  fontWeight: weight,
  color: color,
  letterSpacing: letterSpacing ?? -0.02 * size,
  height: height,
);

TextStyle sans(double size, {Color color = AppColors.slate900, FontWeight weight = FontWeight.w400, double? height}) =>
    TextStyle(fontFamily: AppFonts.sans, fontSize: size, fontWeight: weight, color: color, height: height);

/// Schaduw "shadow-float" van de site.
const floatShadow = [BoxShadow(color: Color(0x5908233B), offset: Offset(0, 30), blurRadius: 60, spreadRadius: -36)];

ThemeData buildTheme() {
  final scheme = ColorScheme.fromSeed(
    seedColor: AppColors.mint,
    primary: AppColors.mint,
    onPrimary: AppColors.mintInk,
    surface: Colors.white,
    onSurface: AppColors.slate900,
    error: AppColors.red600,
  );
  final base = ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: AppColors.background,
    fontFamily: AppFonts.sans,
    splashFactory: InkSparkle.splashFactory,
  );
  return base.copyWith(
    textTheme: base.textTheme.apply(
      fontFamily: AppFonts.sans,
      bodyColor: AppColors.slate900,
      displayColor: AppColors.slate900,
    ),
    textSelectionTheme: const TextSelectionThemeData(
      cursorColor: AppColors.brand,
      selectionColor: AppColors.mintSoft,
      selectionHandleColor: AppColors.mint,
    ),
    snackBarTheme: SnackBarThemeData(
      behavior: SnackBarBehavior.floating,
      backgroundColor: AppColors.navy,
      contentTextStyle: sans(14, color: Colors.white, weight: FontWeight.w600),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
      titleTextStyle: display(22),
      contentTextStyle: sans(15, color: AppColors.slate600, height: 1.5),
    ),
    bottomSheetTheme: const BottomSheetThemeData(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.transparent,
      modalBarrierColor: Color(0x9908233B),
    ),
    progressIndicatorTheme: const ProgressIndicatorThemeData(color: AppColors.mint),
  );
}
