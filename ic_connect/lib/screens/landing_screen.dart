import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:ic_connect/screens/choice_screen.dart';
import 'package:ic_connect/screens/login_screen.dart';
import 'package:ic_connect/widgets/rounded_button.dart';

class LandingScreen extends StatefulWidget {
  const LandingScreen({Key? key}) : super(key: key);

  @override
  State<LandingScreen> createState() => _LandingScreenState();
}

class _LandingScreenState extends State<LandingScreen> {
  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Color(0xFFD4F7FF),
      body: Container(
        padding: const EdgeInsets.all(0),
        height: height,
        width: width,
        child: Stack(
          children: [
            Positioned(
              child: SvgPicture.asset(
                'assets/ic_line.svg',
                colorFilter: ColorFilter.mode(
                  Colors.black.withOpacity(0.2),
                  BlendMode.srcIn,
                ),
              ),
            ),
            Positioned(
              top: height * 0.45,
              left: width * 0.35,
              child: Image.asset('assets/ignite_logo.png'),
            ),
            Positioned(
              top: height * 0.59,
              left: width * 0.3,
              child: const Text(
                'IC Ignite',
                style: TextStyle(
                  fontSize: 38,
                  fontWeight: FontWeight.w500,
                  color: Color(0xFF383838),
                ),
              ),
            ),
            Positioned(
              bottom: height * 0.008,
              child: Container(
                decoration:  const BoxDecoration(
                  borderRadius: BorderRadius.only(
                    topRight: Radius.circular(25),
                    topLeft: Radius.circular(25),
                  ),
                  color: Color(0xFF7AD7EB),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(45),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      const Text(
                        'Startups Made Easy',
                        style: TextStyle(
                          fontSize: 25,
                          // fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(
                        height: 4.0,
                      ),
                      const Padding(
                        padding: EdgeInsets.all(8),
                        child: Text(
                          'Lorem ipsum dolor sit amet, consectetur.',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w200,
                            fontSize: 14,
                          ),
                        ),
                      ),
                      const SizedBox(height: 10),
                      Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: RoundedButton(
                          bText: 'Get Started',
                          bFunction: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const ChoiceScreen(),
                              ),
                            );
                          },
                          textColor: Colors.white,
                          bWidth: width * 0.7,
                        ),
                      ),
                      Row(
                        children: [
                          const Text(
                            "Already have an account ? ",
                            style: TextStyle(
                              // color: Colors.white,
                              decoration: TextDecoration.none,
                              fontSize: 15,
                            ),
                          ),
                          GestureDetector(
                            child: const Text(
                              "Log In",
                              style: TextStyle(
                                color: Colors.blue,
                                decoration: TextDecoration.none,
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const LoginScreen(),
                                ),
                              );
                            },
                          )
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
