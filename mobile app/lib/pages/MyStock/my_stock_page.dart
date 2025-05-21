import 'package:flutter/material.dart';
import 'package:nko/services/api_client.dart';

class MyStock extends StatefulWidget {
  const MyStock({super.key});

  @override
  State<MyStock> createState() => _MyStockState();
}

class _MyStockState extends State<MyStock> {
  List<dynamic> stockData = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchStock();
  }

  Future<void> fetchStock() async {
    try {
      final session = await ApiClient.dio.get('/api/session');
      final repId = session.data['data']['_id'];

      final response = await ApiClient.dio.get(
        '/stock/getRefCurrentStock/$repId',
      );
      if (response.statusCode == 200) {
        setState(() {
          stockData = response.data['data'];
          isLoading = false;
        });
      }
    } catch (e) {
      print("Error: $e");
      if (!mounted) return;
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Stock by Category")),
      body:
          isLoading
              ? const Center(child: CircularProgressIndicator())
              : stockData.isEmpty
              ? const Center(child: Text("No stock found."))
              : ListView.builder(
                itemCount: stockData.length,
                itemBuilder: (_, index) {
                  final category = stockData[index];
                  final products = category['products'] as List<dynamic>;

                  return Card(
                    margin: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    child: ExpansionTile(
                      title: Text(
                        category['name'] ?? 'Unnamed Category',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      children:
                          products.map((prod) {
                            final weight = prod['weight'] ?? 'N/A';
                            final qty = prod['repStock'] ?? 0;
                            final price = prod['salesPrice'] ?? 0;

                            return ListTile(
                              title: Text("$weight g"),
                              subtitle: Text("Price: Rs. $price"),
                              trailing: Text("Stock: $qty"),
                            );
                          }).toList(),
                    ),
                  );
                },
              ),
    );
  }
}
