import 'package:dio/dio.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class ApiClient {
  static late Dio dio;

  static Future<void> init() async {
    // Get path for storing cookies
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;

    // Use PersistCookieJar with storage directory
    PersistCookieJar cookieJar = PersistCookieJar(
      storage: FileStorage('$appDocPath/.cookies/'),
    );
    // http://10.0.2.2:5000'
    // 'http://192.168.1.67:5000'
    dio = Dio(
      BaseOptions(
        baseUrl: 'http://192.168.1.67:5000',
        connectTimeout: const Duration(seconds: 20),
        receiveTimeout: const Duration(seconds: 20),
        headers: {'Content-Type': 'application/json'},
        followRedirects: true,
        validateStatus: (status) => status != null && status < 500,
      ),
    );

    dio.interceptors.add(CookieManager(cookieJar));
  }
}
