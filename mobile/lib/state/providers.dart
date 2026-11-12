import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:material_ui/material_ui.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../data/api_client.dart';
import '../data/models.dart';
import '../premium/purchase_service.dart';

const _tokenKey = 'ab_token';
const _localeKey = 'ab_locale';

final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());

final secureStorageProvider = Provider<FlutterSecureStorage>((ref) => const FlutterSecureStorage());

final sharedPrefsProvider = Provider<SharedPreferences>(
  (ref) => throw UnimplementedError('Wordt in main() overschreven'),
);

final purchaseServiceProvider = Provider<PurchaseService>((ref) => PurchaseService());

// ── Taal ─────────────────────────────────────────────────────────────────

const supportedLanguages = ['nl', 'en', 'de', 'fr', 'es'];

/// Gekozen taal, of null om de taal van de telefoon te volgen.
final localeProvider = NotifierProvider<LocaleNotifier, Locale?>(LocaleNotifier.new);

class LocaleNotifier extends Notifier<Locale?> {
  @override
  Locale? build() {
    final code = ref.watch(sharedPrefsProvider).getString(_localeKey);
    return code != null && supportedLanguages.contains(code) ? Locale(code) : null;
  }

  Future<void> set(String? code) async {
    final prefs = ref.read(sharedPrefsProvider);
    if (code == null) {
      await prefs.remove(_localeKey);
      state = null;
    } else {
      await prefs.setString(_localeKey, code);
      state = Locale(code);
    }
  }
}

// ── Sessie ───────────────────────────────────────────────────────────────

class Session {
  const Session({required this.user, required this.entitlement});
  final AppUser user;
  final Entitlement entitlement;

  Session copyWith({Entitlement? entitlement}) => Session(user: user, entitlement: entitlement ?? this.entitlement);
}

/// null = niet ingelogd.
final sessionProvider = AsyncNotifierProvider<SessionNotifier, Session?>(SessionNotifier.new);

class SessionNotifier extends AsyncNotifier<Session?> {
  ApiClient get _api => ref.read(apiClientProvider);
  FlutterSecureStorage get _storage => ref.read(secureStorageProvider);
  PurchaseService get _purchases => ref.read(purchaseServiceProvider);

  @override
  Future<Session?> build() async {
    _api.onUnauthorized = () => unawaited(_clear());
    final token = await _storage.read(key: _tokenKey);
    if (token == null) return null;
    _api.token = token;
    try {
      final me = await _api.get('/api/mobile/me') as Map<String, dynamic>;
      final session = _fromJson(me);
      unawaited(_afterLogin(session.user));
      return session;
    } on ApiException catch (e) {
      if (e.isUnauthorized) {
        await _clear(updateState: false);
        return null;
      }
      rethrow;
    }
  }

  Session _fromJson(Map<String, dynamic> j) => Session(
    user: AppUser.fromJson(j['user'] as Map<String, dynamic>),
    entitlement: Entitlement.fromJson(j['entitlement'] as Map<String, dynamic>),
  );

  Future<void> login(String email, String password) =>
      _authenticate('/api/mobile/login', {'email': email, 'password': password});

  Future<void> register(String name, String email, String password) =>
      _authenticate('/api/mobile/register', {'name': name, 'email': email, 'password': password});

  Future<void> _authenticate(String path, Map<String, String> body) async {
    final res = await _api.post(path, body) as Map<String, dynamic>;
    final token = res['token'] as String;
    await _storage.write(key: _tokenKey, value: token);
    _api.token = token;
    final session = _fromJson(res);
    state = AsyncData(session);
    unawaited(_afterLogin(session.user));
  }

  /// RevenueCat koppelen aan dit account en de Premium-status ophalen.
  Future<void> _afterLogin(AppUser user) async {
    final ok = await _purchases.logIn(user.id);
    if (ok) await syncPremium();
  }

  /// Laat de server de live status bij RevenueCat nalezen.
  Future<Entitlement?> syncPremium() async {
    try {
      final res = await _api.post('/api/mobile/sync-premium') as Map<String, dynamic>;
      final entitlement = Entitlement.fromJson(res);
      setEntitlement(entitlement);
      return entitlement;
    } catch (_) {
      return null;
    }
  }

  Future<void> refresh() async {
    try {
      final me = await _api.get('/api/mobile/me') as Map<String, dynamic>;
      state = AsyncData(_fromJson(me));
    } catch (_) {}
  }

  void setEntitlement(Entitlement entitlement) {
    final current = state.value;
    if (current != null) state = AsyncData(current.copyWith(entitlement: entitlement));
  }

  Future<void> logout() => _clear();

  Future<void> deleteAccount() async {
    await _api.delete('/api/mobile/me');
    await _clear();
  }

  Future<void> _clear({bool updateState = true}) async {
    _api.token = null;
    await _storage.delete(key: _tokenKey);
    await _purchases.logOut();
    if (updateState) state = const AsyncData(null);
  }
}

// ── Abonnementen ─────────────────────────────────────────────────────────

final subscriptionsProvider = AsyncNotifierProvider<SubscriptionsNotifier, List<Subscription>>(
  SubscriptionsNotifier.new,
);

class SubscriptionsNotifier extends AsyncNotifier<List<Subscription>> {
  ApiClient get _api => ref.read(apiClientProvider);

  @override
  Future<List<Subscription>> build() async {
    // Opnieuw laden zodra een andere gebruiker inlogt.
    final userId = ref.watch(sessionProvider.select((s) => s.value?.user.id));
    if (userId == null) return const [];
    final list = await _api.get('/api/subscriptions') as List;
    return list.whereType<Map<String, dynamic>>().map(Subscription.fromJson).toList();
  }

  Future<void> reload() async {
    state = await AsyncValue.guard(build);
  }

  void _syncCount(List<Subscription> items) {
    final session = ref.read(sessionProvider).value;
    if (session != null) {
      ref.read(sessionProvider.notifier).setEntitlement(session.entitlement.withCount(items.length));
    }
  }

  Future<Subscription> add(SubscriptionInput input) async {
    final json = await _api.post('/api/subscriptions', input.toJson()) as Map<String, dynamic>;
    final created = Subscription.fromJson(json);
    final items = [created, ...?state.value];
    state = AsyncData(items);
    _syncCount(items);
    return created;
  }

  Future<void> edit(String id, SubscriptionInput input) async {
    final json = await _api.patch('/api/subscriptions/$id', input.toJson()) as Map<String, dynamic>;
    final updated = Subscription.fromJson(json);
    state = AsyncData([for (final s in state.value ?? const <Subscription>[]) s.id == id ? updated : s]);
  }

  Future<void> remove(String id) async {
    final previous = state.value ?? const <Subscription>[];
    final items = previous.where((s) => s.id != id).toList();
    state = AsyncData(items); // optimistisch
    try {
      await _api.delete('/api/subscriptions/$id');
      _syncCount(items);
    } catch (e) {
      state = AsyncData(previous); // terugdraaien
      rethrow;
    }
  }
}

// ── Presets ──────────────────────────────────────────────────────────────

final presetsProvider = FutureProvider<PresetCatalog>((ref) async {
  final json = await ref.read(apiClientProvider).get('/api/presets') as Map<String, dynamic>;
  return PresetCatalog.fromJson(json);
});
