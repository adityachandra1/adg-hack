import 'package:flutter/material.dart';
import 'package:ic_connect/screens/signup_screen.dart';

import 'login_screen.dart';

class ChoiceScreen extends StatelessWidget {
  const ChoiceScreen({Key? key, required this.burl}) : super(key: key);
  final String burl;

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: const Color(0xFFD4F7FE),
      body: Container(
        padding: const EdgeInsets.all(0),
        height: height,
        width: width,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Choose your role',
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  SizedBox(
                    height: 12,
                  ),
                  Text(
                    'Are you a student or a startup',
                    style: TextStyle(
                      color: Color(0xFF1BC1D3),
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 50,
              ),
              GestureDetector(
                onTap: (){
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>  SignUp(role: 'student', burl: burl,),
                    ),
                  );
                },
                child: Container(
                  width: width * 0.8,
                  height: height * 0.32,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(12)),
                    color: Color(0xFF7AD7EB),
                  ),
                  child: Column(
                    children: [
                      SizedBox(
                        height: 200,
                        width: 250,
                        child: Image.asset("assets/student.png"),
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          elevation: 0,
                          backgroundColor: const Color(0xFF7AD7EB),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 50, vertical: 10),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                        child: const Text(
                          'I am a student',
                          style: TextStyle(fontSize: 18),
                        ),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>  SignUp(role: 'student', burl: burl,),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(
                height: 50,
              ),
              GestureDetector(
                onTap: (){
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>  SignUp(role: 'startup', burl: burl,),
                    ),
                  );
                },
                child: Container(
                  width: width * 0.8,
                  height: height * 0.32,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(12)),
                    color: Color(0xFF7AD7EB),
                  ),
                  child: Column(
                    children: [
                      SizedBox(
                        height: 200,
                        width: 250,
                        child: Image.asset("assets/startup.png"),
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          elevation: 0,
                          backgroundColor: const Color(0xFF7AD7EB),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 50, vertical: 10),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                        child: const Text(
                          'We are a startup',
                          style: TextStyle(fontSize: 18),
                        ),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>  SignUp(role: 'startup', burl: burl,),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
