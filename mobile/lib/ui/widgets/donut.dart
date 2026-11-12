import 'dart:math' as math;

import 'package:material_ui/material_ui.dart';

import '../../core/theme.dart';

/// Ringdiagram, getekend zoals de SVG-donuts op de site: viewBox 48,
/// straal 16, lijndikte 8 of 9, start bovenaan.
class Donut extends StatelessWidget {
  const Donut({
    super.key,
    required this.size,
    required this.segments,
    this.strokeWidth = 8,
    this.gap = 0.8,
    this.trackColor,
  });

  /// Lengte en kleur per segment, in eenheden van de omtrek (2πr met r = 16).
  final List<(double, Color)> segments;
  final double size;
  final double strokeWidth;
  final double gap;
  final Color? trackColor;

  @override
  Widget build(BuildContext context) => SizedBox(
    width: size,
    height: size,
    child: CustomPaint(painter: _DonutPainter(segments, strokeWidth, gap, trackColor)),
  );
}

const _r = 16.0;
const circumference = 2 * math.pi * _r;

class _DonutPainter extends CustomPainter {
  _DonutPainter(this.segments, this.strokeWidth, this.gap, this.trackColor);
  final List<(double, Color)> segments;
  final double strokeWidth;
  final double gap;
  final Color? trackColor;

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 48;
    canvas.scale(scale);
    final rect = Rect.fromCircle(center: const Offset(24, 24), radius: _r);
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth;
    if (trackColor != null) {
      canvas.drawCircle(const Offset(24, 24), _r, paint..color = trackColor!);
    }
    var start = 0.0;
    final g = segments.length > 1 ? gap : 0.0;
    for (final (length, color) in segments) {
      final visible = math.max(length - g, 0.01);
      canvas.drawArc(rect, -math.pi / 2 + start / _r, visible / _r, false, paint..color = color);
      start += length;
    }
  }

  @override
  bool shouldRepaint(_DonutPainter old) => old.segments != segments;
}

/// Het logo: vier vaste segmenten (Logo.tsx).
class LogoMark extends StatelessWidget {
  const LogoMark({super.key, this.size = 34});
  final double size;

  @override
  Widget build(BuildContext context) => SizedBox(
    width: size,
    height: size,
    child: const CustomPaint(painter: _LogoPainter()),
  );
}

class _LogoPainter extends CustomPainter {
  const _LogoPainter();

  // [lengte, offset] zoals stroke-dasharray / -dashoffset in Logo.tsx.
  static const _parts = [
    (42.0, 0.0, Color(0xFF2DD4BF)),
    (28.0, 45.0, Color(0xFF2AA898)),
    (15.0, 76.0, Color(0xFF7FE3D3)),
    (4.5, 94.0, Color(0xFF1F5A6E)),
  ];

  @override
  void paint(Canvas canvas, Size size) {
    canvas.scale(size.width / 48);
    final rect = Rect.fromCircle(center: const Offset(24, 24), radius: _r);
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 9;
    for (final (length, offset, color) in _parts) {
      canvas.drawArc(rect, -math.pi / 2 + offset / _r, length / _r, false, paint..color = color);
    }
  }

  @override
  bool shouldRepaint(_LogoPainter oldDelegate) => false;
}

/// Logo + woordmerk "Abonnementen" + "Beheren" (mint).
class Wordmark extends StatelessWidget {
  const Wordmark({super.key, this.size = 30, this.dark = true});
  final double size;
  final bool dark;

  @override
  Widget build(BuildContext context) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      LogoMark(size: size),
      const SizedBox(width: 10),
      Flexible(
        child: FittedBox(
          fit: BoxFit.scaleDown,
          alignment: Alignment.centerLeft,
          child: Text.rich(
            TextSpan(
              text: 'Abonnementen',
              children: [
                TextSpan(
                  text: 'Beheren',
                  style: TextStyle(color: dark ? AppColors.mintLight : AppColors.brand),
                ),
              ],
            ),
            style: display(18, color: dark ? Colors.white : AppColors.navy),
          ),
        ),
      ),
    ],
  );
}
