import 'package:flutter/material.dart';
import 'package:nko/pages/shop_detail_page.dart';
import 'package:nko/pages/viewshop%20components/shop_tile.dart';
import 'package:nko/services/api_client.dart';

class ViewShops extends StatefulWidget {
  const ViewShops({super.key});

  @override
  State<ViewShops> createState() => _ViewShopsState();
}

class _ViewShopsState extends State<ViewShops> {
  List<dynamic> shops = [];

  @override
  void initState() {
    super.initState();
    fetchShops();
  }

  Future<void> fetchShops() async {
    try {
      final response = await ApiClient.dio.get('/shop');
      setState(() {
        shops = response.data["data"];
      });
    } catch (e) {
      print('Error fetching shops: $e');
    }
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
      body: ListView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: shops.length,
        itemBuilder: (context, index) {
          final shop = shops[index];
          return ShopTile(
            shopName: shop['name'],
            address: shop['address'],
            totalDebt: shop['totalDebt']?.toDouble() ?? 0.00,
            onTap: () async {
              final result = await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => ShopDetailPage(shopId: shop['_id']),
                ),
              );

              if (result == true) {
                fetchShops();
              }
            },
          );
        },
      ),
    );
  }
}
