import 'package:flutter/gestures.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../core/config.dart';
import '../../core/theme.dart';
import '../../data/api_client.dart';
import '../../state/providers.dart';
import '../l10n_helpers.dart';
import '../widgets/common.dart';
import '../widgets/donut.dart';
import 'settings_screen.dart' show LanguageButton;

enum _Mode { login, register }

/// Inloggen of registreren, zoals /login op de site.
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  var _mode = _Mode.login;
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  String? _nameError, _emailError, _passwordError, _formError;
  var _loading = false;

  bool get _isRegister => _mode == _Mode.register;

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  bool _validate() {
    final l = context.l10n;
    setState(() {
      _nameError = _isRegister && _name.text.trim().isEmpty ? l.errorNameRequired : null;
      _emailError = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$').hasMatch(_email.text.trim()) ? null : l.errorEmailInvalid;
      _passwordError = _isRegister
          ? (_password.text.length < 8 ? l.errorPasswordShort : null)
          : (_password.text.isEmpty ? l.errorPasswordRequired : null);
      _formError = null;
    });
    return _nameError == null && _emailError == null && _passwordError == null;
  }

  Future<void> _submit() async {
    if (_loading || !_validate()) return;
    final l = context.l10n;
    setState(() => _loading = true);
    final session = ref.read(sessionProvider.notifier);
    try {
      if (_isRegister) {
        await session.register(_name.text.trim(), _email.text.trim(), _password.text);
      } else {
        await session.login(_email.text.trim(), _password.text);
      }
      TextInput.finishAutofillContext();
    } on ApiException catch (e) {
      setState(() {
        _formError = switch (e.code) {
          _ when e.isNetwork => l.errorNetwork,
          'INVALID_CREDENTIALS' => l.authInvalidCredentials,
          'NO_PASSWORD' => l.authNoPassword,
          'EMAIL_TAKEN' => l.authEmailTaken,
          _ => l.errorGeneric,
        };
      });
    } catch (_) {
      setState(() => _formError = l.errorGeneric);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  void _setMode(_Mode mode) => setState(() {
    _mode = mode;
    _nameError = _emailError = _passwordError = _formError = null;
  });

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: _Hero()),
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(20, 28, 20, 32),
            sliver: SliverToBoxAdapter(
              child: AutofillGroup(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(_isRegister ? l.authCreateTitle : l.authWelcomeBack, style: display(30, height: 1.15)),
                    const SizedBox(height: 8),
                    Text(
                      _isRegister ? l.authHaveAccountHint : l.authNoAccountHint,
                      style: sans(15, color: AppColors.slate500),
                    ),
                    const SizedBox(height: 22),
                    _Tabs(mode: _mode, onChanged: _setMode),
                    const SizedBox(height: 22),
                    if (_isRegister) ...[
                      AppTextField(
                        label: l.fieldName,
                        hint: l.fieldNameHint,
                        controller: _name,
                        error: _nameError,
                        autofillHints: const [AutofillHints.name],
                        textInputAction: TextInputAction.next,
                        textCapitalization: TextCapitalization.words,
                      ),
                      const SizedBox(height: 16),
                    ],
                    AppTextField(
                      label: l.fieldEmail,
                      hint: l.fieldEmailHint,
                      controller: _email,
                      error: _emailError,
                      keyboardType: TextInputType.emailAddress,
                      autofillHints: const [AutofillHints.email],
                      textInputAction: TextInputAction.next,
                    ),
                    const SizedBox(height: 16),
                    AppTextField(
                      label: l.fieldPassword,
                      hint: _isRegister ? l.fieldPasswordHintNew : '••••••••',
                      controller: _password,
                      error: _passwordError,
                      obscure: true,
                      autofillHints: [_isRegister ? AutofillHints.newPassword : AutofillHints.password],
                      textInputAction: TextInputAction.done,
                      onSubmitted: (_) => _submit(),
                    ),
                    if (_formError != null) ...[
                      const SizedBox(height: 16),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: BoxDecoration(color: AppColors.red50, borderRadius: BorderRadius.circular(14)),
                        child: Text(_formError!, style: sans(14, color: const Color(0xFFB91C1C))),
                      ),
                    ],
                    const SizedBox(height: 20),
                    MintButton(
                      label: _loading ? l.busy : (_isRegister ? l.buttonCreateAccount : l.buttonLogin),
                      loading: _loading,
                      onPressed: _submit,
                    ),
                    const SizedBox(height: 20),
                    _LegalLine(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Hero extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    return Container(
      color: AppColors.navy,
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 12, 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                children: [
                  Expanded(child: Wordmark(size: 30)),
                  LanguageButton(),
                ],
              ),
              const SizedBox(height: 28),
              Text(l.authHeroLine1, style: display(34, color: Colors.white, height: 1.05)),
              Text(l.authHeroLine2, style: display(34, color: AppColors.mint, height: 1.1)),
              const SizedBox(height: 12),
              Padding(
                padding: const EdgeInsets.only(right: 8),
                child: Text(l.authHeroBody, style: sans(15.5, color: AppColors.haze, height: 1.5)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Tabs extends StatelessWidget {
  const _Tabs({required this.mode, required this.onChanged});
  final _Mode mode;
  final ValueChanged<_Mode> onChanged;

  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    Widget tab(_Mode m, String label) {
      final selected = mode == m;
      return Expanded(
        child: GestureDetector(
          onTap: () => onChanged(m),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            padding: const EdgeInsets.symmetric(vertical: 11),
            decoration: BoxDecoration(
              color: selected ? AppColors.navy : Colors.transparent,
              borderRadius: BorderRadius.circular(999),
            ),
            alignment: Alignment.center,
            child: Text(
              label,
              style: sans(
                14,
                color: selected ? Colors.white : AppColors.slate600,
                weight: selected ? FontWeight.w700 : FontWeight.w600,
              ),
            ),
          ),
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(color: AppColors.tabTrack, borderRadius: BorderRadius.circular(999)),
      child: Row(
        children: [tab(_Mode.login, l.tabLogin), const SizedBox(width: 4), tab(_Mode.register, l.tabRegister)],
      ),
    );
  }
}

class _LegalLine extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final l = context.l10n;
    final link = sans(13, color: AppColors.brand, weight: FontWeight.w600);
    return Text.rich(
      TextSpan(
        style: sans(13, color: AppColors.slate500, height: 1.5),
        children: [
          TextSpan(text: '${l.authAgreePrefix} '),
          TextSpan(
            text: l.termsLink,
            style: link,
            recognizer: TapGestureRecognizer()..onTap = () => launchUrl(AppConfig.termsUrl),
          ),
          TextSpan(text: ' ${l.and} '),
          TextSpan(
            text: l.privacyLink,
            style: link,
            recognizer: TapGestureRecognizer()..onTap = () => launchUrl(AppConfig.privacyUrl),
          ),
          const TextSpan(text: '.'),
        ],
      ),
      textAlign: TextAlign.center,
    );
  }
}
