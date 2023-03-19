import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:ic_connect/screens/feed_screen.dart';
import 'package:ic_connect/screens/landing_screen.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

String kAPIEndPoint = '';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  var collection = FirebaseFirestore.instance.collection('backend_url');
  var docSnapshot = await collection.doc('HjLfdS7A7Ldbu1yu9rp6').get();
  if (docSnapshot.exists) {
    Map<String, dynamic>? data = docSnapshot.data();
    var value = data?['url'];
    kAPIEndPoint = value; // <-- The value you want to retrieve.
    // Call setState if needed.
  }
  print("DATA IS: $kAPIEndPoint");
  // kAPIEndPoint = data;

  runApp(
    MyApp(
      burl: kAPIEndPoint,
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key, required this.burl});
  final String burl;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'IC Ignite',
      theme: ThemeData(primarySwatch: Colors.blue, fontFamily: 'Futura'),
      home: LandingScreen(burl: burl),
    );
  }
}
