import 'dart:io';

import 'package:cookie_jar/cookie_jar.dart';
import 'package:flutter/material.dart';
import 'package:nko/pages/my_login_page.dart';
import 'package:nko/services/api_client.dart';
import 'package:path_provider/path_provider.dart';

class LogoutPage extends StatelessWidget {
  const LogoutPage({super.key});

  Future<void> handleLogout(BuildContext context) async {
    try {
      // (Optional) Call your logout API if it clears the session server-side
      final res = await ApiClient.dio.get('/logout');

      if (res.statusCode == 200) {
        Directory appDocDir = await getApplicationDocumentsDirectory();
        PersistCookieJar cookieJar = PersistCookieJar(
          storage: FileStorage('${appDocDir.path}/.cookies/'),
        );
        await cookieJar.deleteAll(); // Clear all session cookies

        // Navigate to login or welcome screen
        Navigator.of(
          context,
        ).pushReplacement(MaterialPageRoute(builder: (_) => MyLoginPage()));
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Logged Out Successfully")),
        );
      } else if (res.statusCode == 401) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text("Already logged out")));
      } else if (res.statusCode == 500) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text("Server error")));
      } else {
        throw Exception("Logout failed");
      }
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Logout failed")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Logout")),
      body: Center(
        child: ElevatedButton.icon(
          icon: const Icon(Icons.logout),
          label: const Text("Logout"),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
          onPressed: () => handleLogout(context),
        ),
      ),
    );
  }
}
