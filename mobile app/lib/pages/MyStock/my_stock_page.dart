import 'package:flutter/material.dart';
import 'package:nko/services/api_client.dart';

class MyStock extends StatefulWidget {
  const MyStock({super.key});

  @override
  State<MyStock> createState() => _MyStockState();
}

class _MyStockState extends State<MyStock> {
  List<Map<String, dynamic>> stocks = [];

  @override
  void initState() {
    super.initState();
    _initialize();
  }

  Future<void> _initialize() async {
    final id = await fetchUserIdFromSession();
    if (id != null) {
      await fetchStocks(id);
    } else {
      print('User ID not found in session.');
    }
  }

  Future<String?> fetchUserIdFromSession() async {
    try {
      final response = await ApiClient.dio.get('/api/session');
      if (response.statusCode == 200) {
        String id = response.data['data']['_id'].toString();
        print('User ID: $id');
        return id;
      } else {
        return null;
      }
    } catch (e) {
      print("Error fetching session: $e");
      return null;
    }
  }

  Future<void> fetchStocks(String id) async {
    try {
      final response = await ApiClient.dio.get('/stock/getRefCurrentStock/$id');
      if (response.statusCode != 200) {
        print('Error fetching stocks: ${response.statusCode}');
        return;
      }
      setState(() {
        stocks = List<Map<String, dynamic>>.from(response.data["data"]);
        print(stocks);
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
        itemCount: stocks.length,
        itemBuilder: (context, index) {
          final category = stocks[index];
          final categoryName = category['name'] ?? '';
          final products = category['products'] as List<dynamic>? ?? [];

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text(
                  categoryName,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              ...products.map((product) {
                final weight = product['weight'] ?? '';
                final quantity = product['repStock'] ?? '';
                return Card(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 4,
                  ),
                  child: ListTile(
                    title: Text('Weight: $weight'),
                    trailing: Text('Qty: $quantity'),
                  ),
                );
              }).toList(),
            ],
          );
        },
      ),
    );
  }
}
