// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Spanish Castilian (`es`).
class AppLocalizationsEs extends AppLocalizations {
  AppLocalizationsEs([String locale = 'es']) : super(locale);

  @override
  String get appName => 'AbonnementenBeheren';

  @override
  String get authHeroLine1 => 'En un minuto,';

  @override
  String get authHeroLine2 => 'todo claro.';

  @override
  String get authHeroBody =>
      'Reúne todas tus suscripciones en un solo lugar y mira cuánto gastas al mes y al año.';

  @override
  String get authWelcomeBack => 'Hola de nuevo';

  @override
  String get authCreateTitle => 'Crea tu cuenta gratis';

  @override
  String get authHaveAccountHint =>
      '¿Ya tienes cuenta? Elige Iniciar sesión arriba.';

  @override
  String get authNoAccountHint =>
      '¿Aún no tienes cuenta? Elige Registrarse arriba.';

  @override
  String get tabLogin => 'Iniciar sesión';

  @override
  String get tabRegister => 'Registrarse';

  @override
  String get fieldName => 'Nombre';

  @override
  String get fieldNameHint => 'Tu nombre';

  @override
  String get fieldEmail => 'Correo electrónico';

  @override
  String get fieldEmailHint => 'nombre@ejemplo.es';

  @override
  String get fieldPassword => 'Contraseña';

  @override
  String get fieldPasswordHintNew => 'Mínimo 8 caracteres';

  @override
  String get errorNameRequired => 'Escribe tu nombre.';

  @override
  String get errorEmailInvalid => 'Escribe un correo válido.';

  @override
  String get errorPasswordShort => 'Usa al menos 8 caracteres.';

  @override
  String get errorPasswordRequired => 'Escribe tu contraseña.';

  @override
  String get buttonLogin => 'Iniciar sesión';

  @override
  String get buttonCreateAccount => 'Crear cuenta';

  @override
  String get busy => 'Un momento…';

  @override
  String get authInvalidCredentials => 'Correo o contraseña incorrectos.';

  @override
  String get authNoPassword =>
      'Esta cuenta inicia sesión con Google. Aún no es posible en la app; usa la web.';

  @override
  String get authEmailTaken => 'Ya existe una cuenta con este correo.';

  @override
  String get authAgreePrefix => 'Al continuar aceptas los';

  @override
  String get and => 'y';

  @override
  String get termsLink => 'Términos';

  @override
  String get privacyLink => 'Política de privacidad';

  @override
  String get errorNetwork =>
      'Sin conexión. Revisa tu internet e inténtalo de nuevo.';

  @override
  String get errorGeneric => 'Algo salió mal. Inténtalo de nuevo.';

  @override
  String get retry => 'Reintentar';

  @override
  String get greetingNight => 'Buenas noches';

  @override
  String get greetingMorning => 'Buenos días';

  @override
  String get greetingAfternoon => 'Buenas tardes';

  @override
  String get greetingEvening => 'Buenas noches';

  @override
  String greetingWithName(String greeting, String name) {
    return '$greeting, $name';
  }

  @override
  String get welcome => 'Bienvenido';

  @override
  String welcomeName(String name) {
    return 'Te damos la bienvenida, $name';
  }

  @override
  String get overviewSubtitleEmpty =>
      'Añade tu primera suscripción para ver tu total.';

  @override
  String get overviewSubtitle => 'Así están tus suscripciones ahora.';

  @override
  String get statPerMonth => 'Al mes';

  @override
  String get statPerYear => 'Al año';

  @override
  String get statSubscriptions => 'Suscripciones';

  @override
  String get other => 'Otros';

  @override
  String get listTitle => 'Suscripciones';

  @override
  String get sortMostExpensive => 'Más caras primero';

  @override
  String get sortCheapest => 'Más baratas primero';

  @override
  String get sortName => 'Por nombre';

  @override
  String get sortNewest => 'Más recientes primero';

  @override
  String get add => 'Añadir';

  @override
  String get emptyTitle => 'Aún no hay suscripciones';

  @override
  String get emptyBody =>
      'Añade tu primera suscripción y mira al instante cuánto gastas al mes.';

  @override
  String get emptyAddButton => 'Añadir suscripción';

  @override
  String get emptyPopular => 'O empieza con un servicio popular';

  @override
  String percentOfTotal(int percent) {
    return '$percent % de tu total';
  }

  @override
  String get perMonthLower => 'al mes';

  @override
  String get edit => 'Editar';

  @override
  String get delete => 'Eliminar';

  @override
  String get cancel => 'Cancelar';

  @override
  String deleteConfirmTitle(String name) {
    return '¿Eliminar $name?';
  }

  @override
  String get deleteConfirmBody => 'Esta suscripción se quitará de tu resumen.';

  @override
  String get deleted => 'Eliminada';

  @override
  String addedName(String name) {
    return '$name añadida';
  }

  @override
  String get saved => 'Guardado';

  @override
  String usageCount(int used, int limit) {
    return '$used de $limit suscripciones gratis';
  }

  @override
  String usageFull(int limit) {
    return 'Has usado las $limit plazas gratis';
  }

  @override
  String get unlimited => 'Ilimitado';

  @override
  String get periodMonthly => 'Al mes';

  @override
  String get periodYearly => 'Al año';

  @override
  String get periodQuarterly => 'Al trimestre';

  @override
  String get periodWeekly => 'A la semana';

  @override
  String get periodMonthlyShort => 'al mes';

  @override
  String get periodYearlyShort => 'al año';

  @override
  String get periodQuarterlyShort => 'al trimestre';

  @override
  String get periodWeeklyShort => 'a la semana';

  @override
  String get addTitle => 'Añadir suscripción';

  @override
  String get customTitle => 'Suscripción propia';

  @override
  String get editTitle => 'Editar suscripción';

  @override
  String searchHint(int count) {
    return 'Busca entre $count servicios, p. ej. Spotify';
  }

  @override
  String customAddQuery(String query) {
    return 'Añadir «$query» tú mismo';
  }

  @override
  String get customAdd => 'Añadir una suscripción propia';

  @override
  String get customAddBody =>
      '¿No aparece tu servicio? Escribe el nombre y el precio.';

  @override
  String get popular => 'Populares';

  @override
  String noResults(String query) {
    return 'No se encontró «$query». Añádelo tú arriba.';
  }

  @override
  String get backToSearch => 'Volver a buscar';

  @override
  String plansCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count planes',
      one: '1 plan',
    );
    return '$_temp0';
  }

  @override
  String get formName => 'Nombre';

  @override
  String get formPlan => 'Plan (opcional)';

  @override
  String get formPlanHint => 'p. ej. Familiar';

  @override
  String get formPrice => 'Precio (€)';

  @override
  String get formPeriod => 'Periodo';

  @override
  String get formCategory => 'Categoría (opcional)';

  @override
  String get formCategoryHint => 'p. ej. Streaming';

  @override
  String get formPriceInvalid => 'Escribe un precio válido.';

  @override
  String get save => 'Guardar';

  @override
  String get premium => 'Premium';

  @override
  String get paywallHeadline1 => 'Empieza gratis.';

  @override
  String get paywallHeadline2 => 'Ilimitado con Premium.';

  @override
  String get paywallLimitTitle => 'Límite alcanzado';

  @override
  String paywallLimitBody(int limit) {
    return 'Con una cuenta gratis gestionas $limit suscripciones. Con Premium, todas las que quieras.';
  }

  @override
  String paywallBody(int limit) {
    return 'Gratis gestionas $limit suscripciones. Premium quita ese límite.';
  }

  @override
  String get perkUnlimited => 'Suscripciones ilimitadas';

  @override
  String get perkExport => 'Exporta tu resumen a Excel (CSV)';

  @override
  String get perkEverywhere => 'Funciona en la web y en la app';

  @override
  String get perkSupport => 'Apoya a un creador independiente';

  @override
  String get planYearly => 'Anual';

  @override
  String get planMonthly => 'Mensual';

  @override
  String get bestValue => 'Mejor precio';

  @override
  String get buyPremium => 'Obtener Premium';

  @override
  String get restorePurchases => 'Restaurar compras';

  @override
  String paywallLegal(String store) {
    return 'Premium se renueva automáticamente hasta que canceles. Puedes cancelar cuando quieras en los ajustes de $store.';
  }

  @override
  String get purchaseSuccess => '¡Bienvenido a Premium!';

  @override
  String get restoreNone => 'No se encontraron compras anteriores.';

  @override
  String get restoreSuccess => 'Se han restaurado tus compras.';

  @override
  String get storeUnavailable =>
      'Las compras no están disponibles ahora. Inténtalo más tarde.';

  @override
  String get youArePremium => 'Tienes Premium. ¡Gracias por tu apoyo!';

  @override
  String get settingsTitle => 'Ajustes';

  @override
  String get account => 'Cuenta';

  @override
  String get language => 'Idioma';

  @override
  String get languageSystem => 'Idioma del sistema';

  @override
  String get plan => 'Plan';

  @override
  String get planFree => 'Gratis';

  @override
  String get manageSubscription => 'Gestionar suscripción';

  @override
  String get premiumViaWeb =>
      'Tienes Premium a través de la web. Gestiónalo en abonnementenbeheren.com.';

  @override
  String get premiumGranted => 'Te han regalado Premium.';

  @override
  String get exportCsv => 'Exportar como CSV';

  @override
  String get logout => 'Cerrar sesión';

  @override
  String get deleteAccount => 'Eliminar cuenta';

  @override
  String get deleteAccountBody =>
      'Tu cuenta y todas tus suscripciones se eliminarán para siempre. No se puede deshacer.';

  @override
  String deleteAccountStoreNote(String store) {
    return '¿Compraste Premium en la app? Cancélalo también en $store.';
  }

  @override
  String get accountDeleted => 'Tu cuenta se ha eliminado.';

  @override
  String get viewOffer => 'Ver oferta';

  @override
  String get termsOfUse => 'Términos de uso (EULA)';

  @override
  String paywallMonthlyPer(String price) {
    return '$price al mes';
  }

  @override
  String get legal => 'Información';

  @override
  String get catAiSoftware => 'IA y software';

  @override
  String get catStreaming => 'Streaming';

  @override
  String get catNews => 'Noticias y revistas';

  @override
  String get catGaming => 'Videojuegos';

  @override
  String get catSport => 'Deporte';

  @override
  String get catMobile => 'Móvil';

  @override
  String get catAppsLifestyle => 'Apps y estilo de vida';

  @override
  String get catInternetTv => 'Internet y TV';

  @override
  String get catMusic => 'Música';

  @override
  String get catOutings => 'Ocio y cultura';

  @override
  String get catMobility => 'Movilidad';

  @override
  String get catBooks => 'Libros';

  @override
  String get catFood => 'Comida y reparto';
}
