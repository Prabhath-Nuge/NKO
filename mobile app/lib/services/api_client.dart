import 'package:dio/dio.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';

class ApiClient {
  static final Dio dio = Dio(
    BaseOptions(
      baseUrl: 'http://192.168.1.43:5000',
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {'Content-Type': 'application/json'},
      followRedirects: true,
      validateStatus: (status) => status != null && status < 500,
    ),
  );

  static final CookieJar cookieJar = CookieJar();

  static void init() {
    dio.interceptors.add(CookieManager(cookieJar));
  }
}
