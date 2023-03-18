import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ic_connect/screens/signup_screen.dart';
import 'package:ic_connect/utils/constants.dart';

import '../../widgets/custom_input.dart';
import '../../widgets/rounded_button.dart';
import '../utils/methods.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({
    Key? key,
  }) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailCtrl = TextEditingController();
  final TextEditingController _passwordCtrl = TextEditingController();
  final FocusNode emailFocus = FocusNode();
  final FocusNode passwordFocus = FocusNode();

  @override
  Widget build(BuildContext context) {
    // Within the `FirstRoute` widget
    return Scaffold(
      // resizeToAvoidBottomInset: false,
      backgroundColor: const Color(0xFFD4F7FE),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Padding(
                  padding: EdgeInsets.only(
                    top: MediaQuery.of(context).size.height * 0.05,
                  ),
                  child: Image.asset("assets/ignite_logo.png"),
                ),
                Padding(
                  padding: EdgeInsets.only(
                    top: MediaQuery.of(context).size.height * 0.05,
                  ),
                  child: const Text(
                    'Sign In',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: 30,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 20.0),
                  child: CustomInput(
                    title: "Learner ID",
                    ctrl: _emailCtrl,
                    isObscure: false,
                    textInputType: TextInputType.emailAddress,
                    textInputAction: TextInputAction.next,
                    nextFocusNode: passwordFocus,
                    focusNode: emailFocus,
                  ),
                ),
                const SizedBox(
                  height: 25,
                ),
                CustomInput(
                  isObscure: true,
                  title: "Password",
                  ctrl: _passwordCtrl,
                  textInputType: TextInputType.visiblePassword,
                  textInputAction: TextInputAction.done,
                  nextFocusNode: FocusNode(canRequestFocus: false),
                  focusNode: passwordFocus,
                ),
                Padding(
                  padding: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width / 2,
                    top: 10,
                  ),
                  child: GestureDetector(
                    child: const Text(
                      "Forgot password?",
                      style: TextStyle(
                        color: Color(0xFF7AD7EB),
                      ),
                    ),
                    onTap: () {
                      Navigator.pushNamed(context, "reset-password");
                    },
                  ),
                ),
                const SizedBox(
                  height: 25,
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 20.0),
                  child: RoundedButton(
                    bWidth: MediaQuery.of(context).size.width / 1.5,
                    bFunction: () async {
                      // print("Clicked");
                      Methods.showLoaderDialog(context);

                      // TODO: implement login

                      await Dio().post("${kAPIEndPoint}auth/login", data: {
                        "email": _emailCtrl.text,
                        "password": _passwordCtrl.text
                      }).then((value) => print(value.data));
                    },
                    bText: "Submit",
                    textColor: Colors.white,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(
                    top: 20.0,
                    left: MediaQuery.of(context).size.width / 5.5,
                  ),
                  child: Row(
                    children: [
                      const Text(
                        "Don't have an account ? ",
                        style: TextStyle(
                          // color: Colors.white,
                          decoration: TextDecoration.none,
                          fontSize: 15,
                        ),
                      ),
                      GestureDetector(
                        child: const Text(
                          "Sign-up",
                          style: TextStyle(
                            color: Color(0xFF7AD7EB),
                            decoration: TextDecoration.none,
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => SignUp(),
                            ),
                          );
                        },
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
