import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

const kInputFieldColor = Color(0xFFF0F0F0);


// const kAPIEndPoint = "https://2293-2401-4900-33ba-5800-b2bb-fcf-8925-307.in.ngrok.io/api/v1/";

const kInputTextFieldDecoration = InputDecoration(
  filled: true,
  fillColor: kInputFieldColor,
  hintStyle: TextStyle(
    color: Colors.black38,
  ),
  contentPadding: EdgeInsets.symmetric(
    vertical: 10.0,
    horizontal: 20.0,
  ),
  border: OutlineInputBorder(
    borderRadius: BorderRadius.all(
      Radius.circular(8.0),
    ),
  ),
  focusedBorder: OutlineInputBorder(
    borderSide: BorderSide(
      color: kInputFieldColor,
    ),
    borderRadius: BorderRadius.all(
      Radius.circular(8.0),
    ),
  ),
  enabledBorder: OutlineInputBorder(
    borderSide: BorderSide(
      color: kInputFieldColor,
    ),
    borderRadius: BorderRadius.all(
      Radius.circular(8.0),
    ),
  ),
);

const kMessageContainerDecoration = BoxDecoration(
  border: Border(
    top: BorderSide(color: Colors.lightBlueAccent, width: 2.0),
  ),
);

const kMessageTextFieldDecoration = InputDecoration(
  contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  hintText: 'Type your message here...',
  hintStyle: TextStyle(color: Colors.black38),
  border: InputBorder.none,
);

const kSendButtonTextStyle = TextStyle(
  color: Colors.lightBlueAccent,
  fontWeight: FontWeight.bold,
  fontSize: 18.0,
);
