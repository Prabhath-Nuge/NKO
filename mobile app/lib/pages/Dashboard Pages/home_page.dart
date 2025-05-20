import 'package:flutter/material.dart';
import 'package:nko/pages/Dashboard%20Pages/Home%20Components/home_tiles.dart';
import 'package:nko/pages/add_shop.dart';
import 'package:nko/pages/MyStock/my_stock_page.dart';
import 'package:nko/pages/order_selecting_page.dart';
import 'package:nko/pages/viewshop%20components/view_shops.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          HomeTile(
            icon: Icons.store,
            label: 'Shops',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => ViewShops()),
              );
            },
          ),
          HomeTile(
            icon: Icons.add_business,
            label: "Add a Shop",
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => AddShopPage()),
              );
            },
          ),
          HomeTile(
            icon: Icons.receipt_long,
            label: 'New Order',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => OrderAddPage()),
              );
            },
          ),
          HomeTile(
            icon: Icons.assignment_turned_in,
            label: "Past Orders",
            onTap: () {},
          ),
          HomeTile(
            icon: Icons.insert_invitation_outlined,
            label: 'My Stock',
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => MyStock()),
              );
            },
          ),
        ],
      ),
    );
  }
}
