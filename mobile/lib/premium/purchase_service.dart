import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:purchases_flutter/purchases_flutter.dart';

import '../core/config.dart';

enum PurchaseOutcome { success, cancelled, failed, unavailable }

/// Dunne laag over RevenueCat. De app logt in met het MongoDB-_id van de
/// gebruiker, zodat de server via webhook en sync-premium weet wie wat kocht.
class PurchaseService {
  bool _configured = false;
  bool get available => _configured;

  Future<void> init() async {
    final key = AppConfig.revenueCatKey;
    if (key.isEmpty || kIsWeb) return;
    try {
      if (kDebugMode) await Purchases.setLogLevel(LogLevel.debug);
      await Purchases.configure(PurchasesConfiguration(key));
      _configured = true;
    } catch (e) {
      debugPrint('RevenueCat niet beschikbaar: $e');
    }
  }

  Future<bool> logIn(String userId) async {
    if (!_configured) return false;
    try {
      await Purchases.logIn(userId);
      return true;
    } catch (e) {
      debugPrint('RevenueCat logIn mislukt: $e');
      return false;
    }
  }

  Future<void> logOut() async {
    if (!_configured) return;
    try {
      if (!await Purchases.isAnonymous) await Purchases.logOut();
    } catch (_) {}
  }

  Future<Offering?> currentOffering() async {
    if (!_configured) return null;
    try {
      final offerings = await Purchases.getOfferings();
      return offerings.current;
    } catch (e) {
      debugPrint('Offerings ophalen mislukt: $e');
      return null;
    }
  }

  Future<PurchaseOutcome> purchase(Package package) async {
    if (!_configured) return PurchaseOutcome.unavailable;
    try {
      final result = await Purchases.purchase(PurchaseParams.package(package));
      return _hasPremium(result.customerInfo) ? PurchaseOutcome.success : PurchaseOutcome.failed;
    } on PlatformException catch (e) {
      final code = PurchasesErrorHelper.getErrorCode(e);
      if (code == PurchasesErrorCode.purchaseCancelledError) return PurchaseOutcome.cancelled;
      debugPrint('Aankoop mislukt: $e');
      return PurchaseOutcome.failed;
    }
  }

  /// true als er na het herstellen Premium actief is.
  Future<bool?> restore() async {
    if (!_configured) return null;
    try {
      final info = await Purchases.restorePurchases();
      return _hasPremium(info);
    } catch (e) {
      debugPrint('Herstellen mislukt: $e');
      return null;
    }
  }

  bool _hasPremium(CustomerInfo info) => info.entitlements.active.containsKey(AppConfig.premiumEntitlement);
}
