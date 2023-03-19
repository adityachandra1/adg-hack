import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ic_connect/models/student.dart';
import 'package:ic_connect/screens/feed_screen.dart';
import 'package:ic_connect/screens/login_screen.dart';
import 'package:ic_connect/utils/constants.dart';
import 'package:ic_connect/widgets/custom_input.dart';
import 'package:ic_connect/widgets/rounded_button.dart';
import 'package:ic_connect/utils/methods.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key, required this.role, required this.burl}) : super(key: key);
  final String role;
  final String burl;

  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final TextEditingController emailCtrl = TextEditingController();
  final TextEditingController regNo = TextEditingController();
  final TextEditingController userName = TextEditingController();
  final TextEditingController passwordCtrl = TextEditingController();

  final FocusNode fNameFocus = FocusNode();
  final FocusNode lNameFocus = FocusNode();
  final FocusNode emailFocus = FocusNode();
  final FocusNode passwordFocus = FocusNode();
  final FocusNode phoneFocus = FocusNode();
  final FocusNode aadhaarFocus = FocusNode();

  String? role;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    role = widget.role;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // resizeToAvoidBottomInset: false,
      backgroundColor: const Color(0xFFD4F7FE),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
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
                    'Sign Up',
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
                    title: "User Name",
                    ctrl: userName,
                    isObscure: false,
                    textInputType: TextInputType.name,
                    textInputAction: TextInputAction.next,
                    nextFocusNode: lNameFocus,
                    focusNode: fNameFocus,
                  ),
                ),
                const SizedBox(
                  height: 25,
                ),
                CustomInput(
                  title: "Learner ID",
                  ctrl: emailCtrl,
                  isObscure: false,
                  textInputType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.next,
                  focusNode: lNameFocus,
                  nextFocusNode: emailFocus,
                ),
                const SizedBox(
                  height: 25,
                ),
                CustomInput(
                  title: "Password",
                  ctrl: passwordCtrl,
                  isObscure: true,
                  textInputType: TextInputType.visiblePassword,
                  textInputAction: TextInputAction.next,
                  focusNode: emailFocus,
                  nextFocusNode: passwordFocus,
                ),
                const SizedBox(
                  height: 25,
                ),
                CustomInput(
                  isObscure: false,
                  title: "Reg No",
                  ctrl: regNo,
                  textInputType: TextInputType.number,
                  textInputAction: TextInputAction.next,
                  focusNode: passwordFocus,
                  nextFocusNode: phoneFocus,
                ),
                const SizedBox(
                  height: 25,
                ),
                // CustomInput(
                //   title: "Phone",
                //   ctrl: regNo,
                //   isObscure: false,
                //   textInputType: TextInputType.phone,
                //   textInputAction: TextInputAction.done,
                //   focusNode: phoneFocus,
                //   nextFocusNode: aadhaarFocus,
                // ),
                // CustomInput(
                //   title: "Aadhaar ID",
                //   ctrl: aadhaar,
                //   isObscure: false,
                //   textInputType: TextInputType.number,
                //   textInputAction: TextInputAction.done,
                //   focusNode: aadhaarFocus,
                //   nextFocusNode: FocusNode(canRequestFocus: false),
                // ),
                Padding(
                  padding: const EdgeInsets.only(top: 20.0),
                  child: RoundedButton(
                    bWidth: MediaQuery.of(context).size.width / 1.5,
                    bFunction: () async {
                      //implement sign up
                      Methods.showLoaderDialog(context);

                      Student student = Student(
                          username: userName.text,
                          email: emailCtrl.text,
                          regNo: regNo.text,
                          interests: [],
                          college: 'MIT',
                          password: passwordCtrl.text,
                          role: role!);

                      Dio()
                          .post('${widget.burl}auth/register-user',
                              data: studentToJson(student))
                          .then((value) => print(value.data))
                          .then((value) {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>  FeedScreen(burl: widget.burl,),
                          ),
                        );
                      });
                    },
                    bText: "Sign Up",
                    textColor: Colors.white,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(
                    top: 20.0,
                    left: MediaQuery.of(context).size.width / 4.5,
                  ),
                  child: Row(
                    children: [
                      const Text(
                        "Have an account ? ",
                        style: TextStyle(
                          // color: Colors.white,
                          decoration: TextDecoration.none,
                          fontSize: 15,
                        ),
                      ),
                      GestureDetector(
                        child: const Text(
                          "Log-in",
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
                              builder: (context) =>  LoginScreen(burl: widget.burl,),
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
