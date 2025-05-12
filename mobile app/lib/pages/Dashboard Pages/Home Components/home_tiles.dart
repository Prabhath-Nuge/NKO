import 'package:flutter/material.dart';

class HomeTile extends StatefulWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const HomeTile({
    super.key,
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  State<HomeTile> createState() => _HomeTileState();
}

class _HomeTileState extends State<HomeTile> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 80, vertical: 10),
        width: double.infinity,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 3,
              offset: const Offset(-4, -4),
            ),
          ],
          border: Border(
            top: BorderSide(color: Colors.black26, width: 3),
            left: BorderSide(color: Colors.black26, width: 3),
          ),
        ),
        child: Row(
          children: [
            Icon(
              widget.icon,
              size: 60,
              color: const Color.fromARGB(200, 255, 255, 255),
              shadows: [
                Shadow(
                  color: Colors.black12,
                  offset: Offset(-5, -3),
                  blurRadius: 5,
                ),
              ],
            ),

            const SizedBox(width: 25),
            Text(
              widget.label,
              style: const TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
