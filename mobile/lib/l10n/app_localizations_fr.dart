// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for French (`fr`).
class AppLocalizationsFr extends AppLocalizations {
  AppLocalizationsFr([String locale = 'fr']) : super(locale);

  @override
  String get appName => 'AbonnementenBeheren';

  @override
  String get authHeroLine1 => 'En une minute,';

  @override
  String get authHeroLine2 => 'tout est clair.';

  @override
  String get authHeroBody =>
      'Réunis tous tes abonnements au même endroit et vois ce que tu dépenses par mois et par an.';

  @override
  String get authWelcomeBack => 'Bon retour';

  @override
  String get authCreateTitle => 'Crée ton compte gratuit';

  @override
  String get authHaveAccountHint => 'Déjà un compte ? Choisis Connexion ci-dessus.';

  @override
  String get authNoAccountHint => 'Pas encore de compte ? Choisis Inscription ci-dessus.';

  @override
  String get tabLogin => 'Connexion';

  @override
  String get tabRegister => 'Inscription';

  @override
  String get fieldName => 'Nom';

  @override
  String get fieldNameHint => 'Ton nom';

  @override
  String get fieldEmail => 'Adresse e-mail';

  @override
  String get fieldEmailHint => 'nom@exemple.fr';

  @override
  String get fieldPassword => 'Mot de passe';

  @override
  String get fieldPasswordHintNew => 'Au moins 8 caractères';

  @override
  String get errorNameRequired => 'Saisis ton nom.';

  @override
  String get errorEmailInvalid => 'Saisis une adresse e-mail valide.';

  @override
  String get errorPasswordShort => 'Utilise au moins 8 caractères.';

  @override
  String get errorPasswordRequired => 'Saisis ton mot de passe.';

  @override
  String get buttonLogin => 'Se connecter';

  @override
  String get buttonCreateAccount => 'Créer un compte';

  @override
  String get busy => 'Un instant…';

  @override
  String get authInvalidCredentials => 'Adresse e-mail ou mot de passe incorrect.';

  @override
  String get authNoPassword =>
      'Ce compte se connecte avec Google. Ce n\'est pas encore possible dans l\'app ; utilise le site web.';

  @override
  String get authEmailTaken => 'Un compte existe déjà avec cette adresse e-mail.';

  @override
  String get authAgreePrefix => 'En continuant, tu acceptes les';

  @override
  String get and => 'et';

  @override
  String get termsLink => 'Conditions';

  @override
  String get privacyLink => 'Politique de confidentialité';

  @override
  String get errorNetwork => 'Pas de connexion. Vérifie ton internet et réessaie.';

  @override
  String get errorGeneric => 'Une erreur est survenue. Réessaie.';

  @override
  String get retry => 'Réessayer';

  @override
  String get greetingNight => 'Bonne nuit';

  @override
  String get greetingMorning => 'Bonjour';

  @override
  String get greetingAfternoon => 'Bon après-midi';

  @override
  String get greetingEvening => 'Bonsoir';

  @override
  String greetingWithName(String greeting, String name) {
    return '$greeting, $name';
  }

  @override
  String get welcome => 'Bienvenue';

  @override
  String welcomeName(String name) {
    return 'Bienvenue, $name';
  }

  @override
  String get overviewSubtitleEmpty => 'Ajoute ton premier abonnement pour voir ton total.';

  @override
  String get overviewSubtitle => 'Voici où en sont tes abonnements.';

  @override
  String get statPerMonth => 'Par mois';

  @override
  String get statPerYear => 'Par an';

  @override
  String get statSubscriptions => 'Abonnements';

  @override
  String get other => 'Autres';

  @override
  String get listTitle => 'Abonnements';

  @override
  String get sortMostExpensive => 'Plus chers d\'abord';

  @override
  String get sortCheapest => 'Moins chers d\'abord';

  @override
  String get sortName => 'Par nom';

  @override
  String get sortNewest => 'Plus récents d\'abord';

  @override
  String get add => 'Ajouter';

  @override
  String get emptyTitle => 'Aucun abonnement';

  @override
  String get emptyBody => 'Ajoute ton premier abonnement et vois tout de suite ce que tu dépenses par mois.';

  @override
  String get emptyAddButton => 'Ajouter un abonnement';

  @override
  String get emptyPopular => 'Ou commence par un service populaire';

  @override
  String percentOfTotal(int percent) {
    return '$percent % de ton total';
  }

  @override
  String get perMonthLower => 'par mois';

  @override
  String get edit => 'Modifier';

  @override
  String get delete => 'Supprimer';

  @override
  String get cancel => 'Annuler';

  @override
  String deleteConfirmTitle(String name) {
    return 'Supprimer $name ?';
  }

  @override
  String get deleteConfirmBody => 'Cet abonnement sera retiré de ton aperçu.';

  @override
  String get deleted => 'Supprimé';

  @override
  String addedName(String name) {
    return '$name ajouté';
  }

  @override
  String get saved => 'Enregistré';

  @override
  String usageCount(int used, int limit) {
    return '$used sur $limit abonnements gratuits';
  }

  @override
  String usageFull(int limit) {
    return 'Les $limit places gratuites sont utilisées';
  }

  @override
  String get unlimited => 'Illimité';

  @override
  String get periodMonthly => 'Par mois';

  @override
  String get periodYearly => 'Par an';

  @override
  String get periodQuarterly => 'Par trimestre';

  @override
  String get periodWeekly => 'Par semaine';

  @override
  String get periodMonthlyShort => 'par mois';

  @override
  String get periodYearlyShort => 'par an';

  @override
  String get periodQuarterlyShort => 'par trimestre';

  @override
  String get periodWeeklyShort => 'par semaine';

  @override
  String get addTitle => 'Ajouter un abonnement';

  @override
  String get customTitle => 'Abonnement personnalisé';

  @override
  String get editTitle => 'Modifier l\'abonnement';

  @override
  String searchHint(int count) {
    return 'Cherche parmi $count services, ex. Spotify';
  }

  @override
  String customAddQuery(String query) {
    return 'Ajouter « $query » toi-même';
  }

  @override
  String get customAdd => 'Ajouter un abonnement personnalisé';

  @override
  String get customAddBody => 'Ton service n\'y est pas ? Saisis le nom et le prix toi-même.';

  @override
  String get popular => 'Populaires';

  @override
  String noResults(String query) {
    return 'Aucun service trouvé pour « $query ». Ajoute-le toi-même ci-dessus.';
  }

  @override
  String get backToSearch => 'Retour à la recherche';

  @override
  String plansCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(count, locale: localeName, other: '$count formules', one: '1 formule');
    return '$_temp0';
  }

  @override
  String get formName => 'Nom';

  @override
  String get formPlan => 'Formule (facultatif)';

  @override
  String get formPlanHint => 'ex. Famille';

  @override
  String get formPrice => 'Prix (€)';

  @override
  String get formPeriod => 'Période';

  @override
  String get formCategory => 'Catégorie (facultatif)';

  @override
  String get formCategoryHint => 'ex. Streaming';

  @override
  String get formPriceInvalid => 'Saisis un prix valide.';

  @override
  String get save => 'Enregistrer';

  @override
  String get premium => 'Premium';

  @override
  String get paywallHeadline1 => 'Commence gratuitement.';

  @override
  String get paywallHeadline2 => 'Illimité avec Premium.';

  @override
  String get paywallLimitTitle => 'Limite atteinte';

  @override
  String paywallLimitBody(int limit) {
    return 'Un compte gratuit suit $limit abonnements. Avec Premium, ajoute-en autant que tu veux.';
  }

  @override
  String paywallBody(int limit) {
    return 'Gratuitement, tu suis $limit abonnements. Premium supprime cette limite.';
  }

  @override
  String get perkUnlimited => 'Abonnements illimités';

  @override
  String get perkExport => 'Exporte ton aperçu vers Excel (CSV)';

  @override
  String get perkEverywhere => 'Fonctionne sur le site et dans l\'app';

  @override
  String get perkSupport => 'Soutiens un créateur indépendant';

  @override
  String get planYearly => 'Annuel';

  @override
  String get planMonthly => 'Mensuel';

  @override
  String get bestValue => 'Le plus avantageux';

  @override
  String get buyPremium => 'Passer à Premium';

  @override
  String get restorePurchases => 'Restaurer les achats';

  @override
  String get paywallLegal =>
      'Premium se renouvelle automatiquement jusqu\'à résiliation. Tu peux résilier à tout moment dans les réglages de l\'App Store ou de Google Play.';

  @override
  String get purchaseSuccess => 'Bienvenue dans Premium !';

  @override
  String get restoreNone => 'Aucun achat précédent trouvé.';

  @override
  String get restoreSuccess => 'Tes achats ont été restaurés.';

  @override
  String get storeUnavailable => 'Les achats ne sont pas disponibles pour le moment. Réessaie plus tard.';

  @override
  String get youArePremium => 'Tu as Premium. Merci pour ton soutien !';

  @override
  String get settingsTitle => 'Réglages';

  @override
  String get account => 'Compte';

  @override
  String get language => 'Langue';

  @override
  String get languageSystem => 'Langue du système';

  @override
  String get plan => 'Formule';

  @override
  String get planFree => 'Gratuit';

  @override
  String get manageSubscription => 'Gérer l\'abonnement';

  @override
  String get premiumViaWeb => 'Tu as Premium via le site. Gère-le sur abonnementenbeheren.com.';

  @override
  String get premiumGranted => 'Premium t\'a été offert.';

  @override
  String get exportCsv => 'Exporter en CSV';

  @override
  String get logout => 'Se déconnecter';

  @override
  String get deleteAccount => 'Supprimer le compte';

  @override
  String get deleteAccountBody =>
      'Ton compte et tous tes abonnements seront définitivement supprimés. C\'est irréversible.';

  @override
  String get deleteAccountStoreNote =>
      'Tu as acheté Premium dans l\'app ? Résilie-le aussi dans l\'App Store ou Google Play.';

  @override
  String get accountDeleted => 'Ton compte a été supprimé.';

  @override
  String get viewOffer => 'Voir l\'offre';

  @override
  String get termsOfUse => 'Conditions d\'utilisation (CLUF)';

  @override
  String paywallMonthlyPer(String price) {
    return '$price par mois';
  }

  @override
  String get legal => 'À propos';

  @override
  String get catAiSoftware => 'IA & Logiciels';

  @override
  String get catStreaming => 'Streaming';

  @override
  String get catNews => 'Actualités & Magazines';

  @override
  String get catGaming => 'Jeux vidéo';

  @override
  String get catSport => 'Sport';

  @override
  String get catMobile => 'Mobile';

  @override
  String get catAppsLifestyle => 'Apps & Lifestyle';

  @override
  String get catInternetTv => 'Internet & TV';

  @override
  String get catMusic => 'Musique';

  @override
  String get catOutings => 'Sorties & Culture';

  @override
  String get catMobility => 'Mobilité';

  @override
  String get catBooks => 'Livres';

  @override
  String get catFood => 'Repas & Livraison';
}
