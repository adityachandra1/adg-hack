import 'package:flutter/material.dart';

class RoundedButton extends StatefulWidget {
  const RoundedButton({
    Key? key,
    required this.bText,
    required this.bFunction,
    required this.textColor,
    required this.bWidth,
  }) : super(key: key);
  final String bText;
  final Function bFunction;
  final Color textColor;
  final double bWidth;

  @override
  State<RoundedButton> createState() => _RoundedButtonState();
}

class _RoundedButtonState extends State<RoundedButton> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        await widget.bFunction();
      },
      child: Container(
        width: widget.bWidth,
        height: 50,
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.all(
            Radius.circular(60),
          ),
          color: Color(0xFF1BC1D3),
        ),
        child: Center(
          child: Text(
            widget.bText,
            style: TextStyle(
              color: widget.textColor,
              fontSize: 18,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ),
    );
  }
}
