import 'package:flutter_svg/flutter_svg.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/theme.dart';
import '../../data/models.dart';

Color parseHex(String? hex, {Color fallback = AppColors.navySoft}) {
  if (hex == null) return fallback;
  final h = hex.replaceFirst('#', '');
  final v = int.tryParse(h.length == 6 ? 'FF$h' : h, radix: 16);
  return v == null ? fallback : Color(v);
}

/// Logo-tegel voor een dienst (ServiceLogo.tsx): merkicoon → favicon →
/// gekleurde initiaal.
class ServiceLogo extends StatelessWidget {
  const ServiceLogo({super.key, required this.name, this.brand, this.logoUrl, this.color, this.size = 40, this.radius});

  final String name;
  final BrandIcon? brand;
  final String? logoUrl;
  final String? color;
  final double size;

  /// null = rond.
  final double? radius;

  @override
  Widget build(BuildContext context) {
    final glyph = (size * 0.52).roundToDouble();
    final shape = radius == null
        ? const CircleBorder()
        : RoundedRectangleBorder(borderRadius: BorderRadius.circular(radius!));

    if (brand != null) {
      final b = brand!;
      return _tile(
        shape,
        color: parseHex(b.bg),
        child: SvgPicture.string(
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${b.path}" fill="${b.fg}"/></svg>',
          width: glyph,
          height: glyph,
        ),
      );
    }

    final fallback = _tile(shape, color: parseHex(color), child: _initial(glyph));

    if (logoUrl != null) {
      // Favicon in een witte tegel; lukt laden niet, dan de gekleurde initiaal.
      return Image.network(
        logoUrl!,
        width: glyph,
        height: glyph,
        fit: BoxFit.contain,
        frameBuilder: (_, child, _, _) => _tile(
          shape,
          color: Colors.white,
          border: const BorderSide(color: AppColors.line),
          child: child,
        ),
        errorBuilder: (_, _, _) => fallback,
      );
    }

    return fallback;
  }

  Widget _initial(double glyph) {
    final initial = name.trim().isEmpty ? '?' : name.trim()[0].toUpperCase();
    return Text(initial, style: display(size * 0.42, color: Colors.white));
  }

  Widget _tile(ShapeBorder shape, {required Color color, required Widget child, BorderSide? border}) {
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: ShapeDecoration(
        color: color,
        shape: border == null
            ? shape
            : (shape is CircleBorder
                  ? CircleBorder(side: border)
                  : (shape as RoundedRectangleBorder).copyWith(side: border)),
      ),
      child: child,
    );
  }
}
