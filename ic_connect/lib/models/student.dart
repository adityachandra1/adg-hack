// To parse this JSON data, do
//
//     final student = studentFromJson(jsonString);

import 'dart:convert';

Student studentFromJson(String str) => Student.fromJson(json.decode(str));

String studentToJson(Student data) => json.encode(data.toJson());

class Student {
  Student({
    required this.username,
    required this.email,
    required this.regNo,
    required this.interests,
    required this.college,
    required this.password,
    required this.role,
  });

  final String username;
  final String email;
  final String regNo;
  final List<String> interests;
  final String college;
  final String password;
  final String role;

  factory Student.fromJson(Map<String, dynamic> json) => Student(
    username: json["username"],
    email: json["email"],
    regNo: json["regNo"],
    interests: List<String>.from(json["interests"].map((x) => x)),
    college: json["college"],
    password: json["password"],
    role: json["role"],
  );

  Map<String, dynamic> toJson() => {
    "username": username,
    "email": email,
    "regNo": regNo,
    "interests": List<dynamic>.from(interests.map((x) => x)),
    "college": college,
    "password": password,
    "role": role,
  };
}
