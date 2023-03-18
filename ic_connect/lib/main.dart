import 'package:flutter/material.dart';
import 'package:ic_connect/screens/landing_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'IC Ignite',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Futura'
      ),
      home: const LandingScreen(),
    );
  }
}

