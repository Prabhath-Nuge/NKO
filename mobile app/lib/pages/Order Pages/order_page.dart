import 'package:flutter/material.dart';
import 'package:nko/pages/Order%20Pages/order_ongoing_page.dart';
import 'package:nko/pages/order_selecting_page.dart';

class OrderDashboard extends StatefulWidget {
  const OrderDashboard({super.key});

  @override
  State<OrderDashboard> createState() => _OrderDashboardState();
}

class _OrderDashboardState extends State<OrderDashboard> {
  int _selectedIndex = 0;

  // List of widgets to display for each tab
  final List<Widget> _pages = [OrderAddPage(), OngoingOrdersPage()];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Image.asset('images/2.png', height: 50),
        centerTitle: true,
        backgroundColor: Colors.blue,
        elevation: 0,
      ),
      body: _pages[_selectedIndex],
      backgroundColor: const Color.fromARGB(255, 233, 232, 232),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart),
            label: 'Select',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.assignment),
            label: 'Ongoing',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blue,
        onTap: _onItemTapped,
      ),
    );
  }
}
