import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:http/testing.dart';

/// Nep-API met hetzelfde gedrag als de website: gratis limiet, 403 met
/// LIMIT_REACHED, login met token.
class FakeBackend {
  FakeBackend({this.premium = false, this.limit = 5, List<Map<String, dynamic>>? subs}) : subs = subs ?? [];

  bool premium;
  int limit;
  final List<Map<String, dynamic>> subs;
  var _nextId = 100;

  static final presetsJson = File('test/fixtures/presets.json').readAsStringSync();

  Map<String, dynamic> get entitlement => {
    'premiumEnabled': true,
    'isPremium': premium,
    'source': premium ? 'store' : null,
    'limit': premium ? null : limit,
    'count': subs.length,
    'canAdd': premium || subs.length < limit,
  };

  late final client = MockClient((req) async {
    final path = req.url.path;
    http.Response json(Object body, [int status = 200]) => http.Response.bytes(
      utf8.encode(jsonEncode(body)),
      status,
      headers: {'content-type': 'application/json; charset=utf-8'},
    );

    if (path == '/api/presets') {
      return http.Response.bytes(
        utf8.encode(presetsJson),
        200,
        headers: {'content-type': 'application/json; charset=utf-8'},
      );
    }
    if (path == '/api/mobile/login' || path == '/api/mobile/register') {
      final body = jsonDecode(req.body) as Map<String, dynamic>;
      if (body['password'] == 'fout') {
        return json({'error': 'Onjuist', 'code': 'INVALID_CREDENTIALS'}, 401);
      }
      return json({
        'token': 'tok',
        'user': {'id': '6af583bdc23f063cd3283d77', 'name': body['name'] ?? 'Sanne de Vries', 'email': body['email']},
        'entitlement': entitlement,
      });
    }
    if (req.headers['Authorization'] != 'Bearer tok') return json({'error': 'Niet ingelogd'}, 401);
    if (path == '/api/mobile/me') {
      return json({
        'user': {'id': '6af583bdc23f063cd3283d77', 'name': 'Sanne de Vries', 'email': 'sanne@example.com'},
        'entitlement': entitlement,
      });
    }
    if (path == '/api/mobile/sync-premium') return json(entitlement);
    if (path == '/api/subscriptions' && req.method == 'GET') return json(subs);
    if (path == '/api/subscriptions' && req.method == 'POST') {
      if (!premium && subs.length >= limit) {
        return json({'error': 'Limiet', 'code': 'LIMIT_REACHED', 'limit': limit, 'count': subs.length}, 403);
      }
      final body = jsonDecode(req.body) as Map<String, dynamic>;
      final created = {...body, 'id': '${_nextId++}'};
      subs.insert(0, created);
      return json(created, 201);
    }
    if (path.startsWith('/api/subscriptions/') && req.method == 'DELETE') {
      subs.removeWhere((s) => s['id'] == path.split('/').last);
      return json({'ok': true});
    }
    return json({'error': 'Niet gevonden'}, 404);
  });

  static Map<String, dynamic> sub(
    String id,
    String name,
    String presetId,
    String plan,
    double price, {
    String period = 'maandelijks',
  }) {
    final presets = (jsonDecode(presetsJson)['presets'] as List).cast<Map<String, dynamic>>();
    final preset = presets.firstWhere((p) => p['id'] == presetId, orElse: () => {});
    return {
      'id': id,
      'name': name,
      'planName': plan,
      'price': price,
      'billingPeriod': period,
      'presetId': presetId,
      'logoUrl': preset['logoUrl'],
      'color': preset['color'],
      'brand': preset['brand'],
    };
  }

  static List<Map<String, dynamic>> sampleSubs() => [
    sub('1', 'Basic-Fit', 'basicfit', 'Comfort', 29.99),
    sub('2', 'ChatGPT', 'chatgpt', 'Plus', 23),
    sub('3', 'Netflix', 'netflix', 'Standaard', 13.99),
    sub('4', 'Spotify', 'spotify', 'Individual', 11.99),
    sub('5', 'Disney+', 'disneyplus', 'Standard', 9.99),
  ];
}
