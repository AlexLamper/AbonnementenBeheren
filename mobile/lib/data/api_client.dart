import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

import '../core/config.dart';

/// Fout van de API, met de `code` die de server meestuurt
/// (bijv. LIMIT_REACHED, EMAIL_TAKEN, INVALID_CREDENTIALS).
class ApiException implements Exception {
  ApiException(this.status, this.message, {this.code});
  final int status;
  final String message;
  final String? code;

  bool get isNetwork => status == 0;
  bool get isUnauthorized => status == 401;
  bool get isLimitReached => code == 'LIMIT_REACHED';

  @override
  String toString() => 'ApiException($status, $code, $message)';
}

class ApiClient {
  ApiClient({http.Client? client, this.baseUrl = AppConfig.apiBaseUrl}) : _client = client ?? http.Client();

  final http.Client _client;
  final String baseUrl;

  /// Token van de ingelogde gebruiker; null = niet ingelogd.
  String? token;

  /// Wordt aangeroepen als de server zegt dat het token niet meer geldig is.
  void Function()? onUnauthorized;

  Map<String, String> _headers({bool json = true}) => {
    'Accept': 'application/json',
    if (json) 'Content-Type': 'application/json',
    if (token != null) 'Authorization': 'Bearer $token',
  };

  Future<dynamic> get(String path) => _send(() => _client.get(_uri(path), headers: _headers(json: false)));

  Future<dynamic> post(String path, [Object? body]) =>
      _send(() => _client.post(_uri(path), headers: _headers(), body: body == null ? null : jsonEncode(body)));

  Future<dynamic> patch(String path, Object body) =>
      _send(() => _client.patch(_uri(path), headers: _headers(), body: jsonEncode(body)));

  Future<dynamic> delete(String path) => _send(() => _client.delete(_uri(path), headers: _headers(json: false)));

  /// Ruwe tekst (voor de CSV-export).
  Future<String> getText(String path) async {
    final res = await _raw(() => _client.get(_uri(path), headers: _headers(json: false)));
    if (res.statusCode >= 200 && res.statusCode < 300) return utf8.decode(res.bodyBytes);
    throw _error(res);
  }

  Uri _uri(String path) => Uri.parse('$baseUrl$path');

  Future<http.Response> _raw(Future<http.Response> Function() call) async {
    try {
      return await call().timeout(const Duration(seconds: 20));
    } on SocketException {
      throw ApiException(0, 'network');
    } on TimeoutException {
      throw ApiException(0, 'timeout');
    } on http.ClientException {
      throw ApiException(0, 'network');
    }
  }

  Future<dynamic> _send(Future<http.Response> Function() call) async {
    final res = await _raw(call);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.bodyBytes.isEmpty) return null;
      return jsonDecode(utf8.decode(res.bodyBytes));
    }
    throw _error(res);
  }

  ApiException _error(http.Response res) {
    String message = 'HTTP ${res.statusCode}';
    String? code;
    try {
      final body = jsonDecode(utf8.decode(res.bodyBytes));
      if (body is Map) {
        message = body['error'] as String? ?? message;
        code = body['code'] as String?;
      }
    } catch (_) {}
    if (res.statusCode == 401 && token != null) onUnauthorized?.call();
    return ApiException(res.statusCode, message, code: code);
  }
}
