import 'package:flutter/material.dart';
import 'package:nko/pages/dashboard_page.dart';
import 'package:nko/pages/my_login_page.dart';
import 'package:nko/services/api_client.dart';

class SessionWrapper extends StatefulWidget {
  const SessionWrapper({super.key});

  @override
  State<SessionWrapper> createState() => _SessionWrapperState();
}

class _SessionWrapperState extends State<SessionWrapper> {
  Future<bool> checkSession() async {
    try {
      final response = await ApiClient.dio.get('/api/session');
      print(response.data);
      if (response.statusCode == 200 && response.data['data'] != null) {
        return true;
      }
    } catch (e) {
      print("Session check failed: $e");
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: checkSession(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        } else if (snapshot.hasData && snapshot.data == true) {
          return const Dashboard(); // or whatever your dashboard widget is
        } else {
          return const MyLoginPage();
        }
      },
    );
  }
}
