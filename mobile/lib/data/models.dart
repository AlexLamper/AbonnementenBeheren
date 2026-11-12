import '../core/money.dart';

/// Merkicoon (Simple Icons) zoals de server het meestuurt.
class BrandIcon {
  const BrandIcon({required this.path, required this.bg, required this.fg});
  final String path;
  final String bg;
  final String fg;

  static BrandIcon? fromJson(Object? json) {
    if (json is! Map) return null;
    final path = json['path'];
    if (path is! String || path.isEmpty) return null;
    return BrandIcon(path: path, bg: json['bg'] as String? ?? '#4F6B84', fg: json['fg'] as String? ?? '#FFFFFF');
  }
}

double _num(Object? v) => v is num ? v.toDouble() : double.tryParse('$v') ?? 0;
String? _str(Object? v) => v is String && v.isNotEmpty ? v : null;

class Subscription {
  const Subscription({
    required this.id,
    required this.name,
    required this.price,
    required this.billingPeriod,
    this.planName,
    this.category,
    this.presetId,
    this.logoUrl,
    this.color,
    this.notes,
    this.brand,
    this.createdAt,
  });

  final String id;
  final String name;
  final String? planName;
  final double price;
  final BillingPeriod billingPeriod;
  final String? category;
  final String? presetId;
  final String? logoUrl;
  final String? color;
  final String? notes;
  final BrandIcon? brand;
  final DateTime? createdAt;

  double get monthly => toMonthly(price, billingPeriod);
  double get yearly => toYearly(price, billingPeriod);

  factory Subscription.fromJson(Map<String, dynamic> j) => Subscription(
    id: j['id'] as String,
    name: j['name'] as String? ?? '',
    planName: _str(j['planName']),
    price: _num(j['price']),
    billingPeriod: BillingPeriod.parse(j['billingPeriod'] as String?),
    category: _str(j['category']),
    presetId: _str(j['presetId']),
    logoUrl: _str(j['logoUrl']),
    color: _str(j['color']),
    notes: _str(j['notes']),
    brand: BrandIcon.fromJson(j['brand']),
    createdAt: DateTime.tryParse(j['createdAt'] as String? ?? ''),
  );
}

/// Wat je naar de server stuurt bij toevoegen of bewerken.
class SubscriptionInput {
  const SubscriptionInput({
    required this.name,
    required this.price,
    required this.billingPeriod,
    this.planName = '',
    this.category = '',
    this.presetId,
    this.logoUrl,
    this.color,
  });

  final String name;
  final String planName;
  final double price;
  final BillingPeriod billingPeriod;
  final String category;
  final String? presetId;
  final String? logoUrl;
  final String? color;

  Map<String, dynamic> toJson() => {
    'name': name,
    'planName': planName,
    'price': price,
    'billingPeriod': billingPeriod.name,
    'category': category,
    'presetId': ?presetId,
    'logoUrl': ?logoUrl,
    'color': ?color,
  };
}

class PresetPlan {
  const PresetPlan({required this.name, required this.price, required this.billingPeriod});
  final String name;
  final double price;
  final BillingPeriod billingPeriod;

  factory PresetPlan.fromJson(Map<String, dynamic> j) => PresetPlan(
    name: j['name'] as String? ?? '',
    price: _num(j['price']),
    billingPeriod: BillingPeriod.parse(j['billingPeriod'] as String?),
  );
}

class Preset {
  const Preset({
    required this.id,
    required this.name,
    required this.category,
    required this.plans,
    this.logoUrl,
    this.color,
    this.affiliateUrl,
    this.brand,
  });

  final String id;
  final String name;
  final String category;
  final String? logoUrl;
  final String? color;
  final String? affiliateUrl;
  final BrandIcon? brand;
  final List<PresetPlan> plans;

  factory Preset.fromJson(Map<String, dynamic> j) => Preset(
    id: j['id'] as String,
    name: j['name'] as String? ?? '',
    category: j['category'] as String? ?? '',
    logoUrl: _str(j['logoUrl']),
    color: _str(j['color']),
    affiliateUrl: _str(j['affiliateUrl']),
    brand: BrandIcon.fromJson(j['brand']),
    plans: ((j['plans'] as List?) ?? const []).whereType<Map<String, dynamic>>().map(PresetPlan.fromJson).toList(),
  );
}

class PresetCatalog {
  const PresetCatalog({required this.presets, required this.popularIds});
  final List<Preset> presets;
  final List<String> popularIds;

  /// Zelfde volgorde als popularPresets() op de site.
  List<Preset> popular([int limit = 8]) {
    final ranked = [for (final id in popularIds) ...presets.where((p) => p.id == id)];
    final rest = presets.where((p) => !popularIds.contains(p.id));
    return [...ranked, ...rest].take(limit).toList();
  }

  /// Zelfde scoring als searchPresets() op de site.
  List<Preset> search(String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return presets;
    final qn = _normalize(q);
    final scored = <(Preset, int)>[];
    for (final p in presets) {
      final name = p.name.toLowerCase();
      final nameN = _normalize(name);
      var score = 0;
      if (name == q || nameN == qn) {
        score = 100;
      } else if (name.startsWith(q) || (qn.isNotEmpty && nameN.startsWith(qn))) {
        score = 80;
      } else if (name.split(RegExp(r'[\s.+&-]+')).any((w) => w.startsWith(q))) {
        score = 60;
      } else if (name.contains(q) || (qn.isNotEmpty && nameN.contains(qn))) {
        score = 40;
      } else if (qn.isNotEmpty && p.id.contains(qn)) {
        score = 30;
      } else if (p.category.toLowerCase().contains(q)) {
        score = 10;
      }
      if (score > 0) scored.add((p, score));
    }
    scored.sort((a, b) {
      final byScore = b.$2.compareTo(a.$2);
      return byScore != 0 ? byScore : a.$1.name.toLowerCase().compareTo(b.$1.name.toLowerCase());
    });
    return scored.map((s) => s.$1).toList();
  }

  static String _normalize(String s) => s.toLowerCase().replaceAll('+', 'plus').replaceAll(RegExp(r'[^a-z0-9]'), '');

  factory PresetCatalog.fromJson(Map<String, dynamic> j) => PresetCatalog(
    presets: ((j['presets'] as List?) ?? const []).whereType<Map<String, dynamic>>().map(Preset.fromJson).toList(),
    popularIds: ((j['popular'] as List?) ?? const []).whereType<String>().toList(),
  );
}

enum PremiumSource { stripe, store, granted }

class Entitlement {
  const Entitlement({
    required this.premiumEnabled,
    required this.isPremium,
    required this.limit,
    required this.count,
    required this.canAdd,
    this.source,
  });

  final bool premiumEnabled;
  final bool isPremium;
  final PremiumSource? source;

  /// Maximum aantal abonnementen, of null voor onbeperkt.
  final int? limit;
  final int count;
  final bool canAdd;

  static const unlimited = Entitlement(premiumEnabled: false, isPremium: false, limit: null, count: 0, canAdd: true);

  /// Met een nieuw aantal (na toevoegen of verwijderen) zonder serverrondje.
  Entitlement withCount(int newCount) => Entitlement(
    premiumEnabled: premiumEnabled,
    isPremium: isPremium,
    source: source,
    limit: limit,
    count: newCount,
    canAdd: limit == null || newCount < limit!,
  );

  factory Entitlement.fromJson(Map<String, dynamic> j) => Entitlement(
    premiumEnabled: j['premiumEnabled'] == true,
    isPremium: j['isPremium'] == true,
    source: switch (j['source']) {
      'stripe' => PremiumSource.stripe,
      'store' => PremiumSource.store,
      'granted' => PremiumSource.granted,
      _ => null,
    },
    limit: (j['limit'] as num?)?.toInt(),
    count: (j['count'] as num?)?.toInt() ?? 0,
    canAdd: j['canAdd'] != false,
  );
}

class AppUser {
  const AppUser({required this.id, required this.name, required this.email});
  final String id;
  final String name;
  final String email;

  String get firstName => name.trim().split(RegExp(r'\s+')).first;

  factory AppUser.fromJson(Map<String, dynamic> j) =>
      AppUser(id: j['id'] as String, name: j['name'] as String? ?? '', email: j['email'] as String? ?? '');
}
