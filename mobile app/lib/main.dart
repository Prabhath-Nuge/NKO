import 'package:flutter/material.dart';
import 'package:nko/pages/my_login_page.dart';
import 'package:nko/services/api_client.dart';

void main() {
  ApiClient.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MyLoginPage(),
    );
  }
}
