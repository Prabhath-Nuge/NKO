import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nko/services/api_client.dart';

class OrderAddPage extends StatefulWidget {
  const OrderAddPage({super.key});

  @override
  State<OrderAddPage> createState() => _OrderAddPageState();
}

class _OrderAddPageState extends State<OrderAddPage> {
  List<Map<String, dynamic>> stocks = [];
  Map<String, Map<String, String>> updates = {}; // key = product id
  Map<String, double> totals = {};
  Map<String, double> discounts = {};

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
      if (response.statusCode == 200) {
        setState(() {
          stocks = List<Map<String, dynamic>>.from(response.data["data"]);
        });
      } else {
        print('Error fetching stocks: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching stocks: $e');
    }
  }

  Future<void> submitStockUpdate(String productId) async {
    final data = updates[productId];
    if (data == null || data['quantity']!.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Please fill both fields.")));
      return;
    }

    final quantity = int.tryParse(data['quantity'] ?? '0') ?? 0;
    final discount = double.tryParse(data['discount'] ?? '0') ?? 0;

    final product = stocks
        .expand((category) => category['products'] as List<dynamic>)
        .firstWhere(
          (p) => p['productId'].toString() == productId,
          orElse: () => null,
        );

    if (product == null) {
      print('Product not found for ID: $productId');
      return;
    }

    final shopPrice = double.tryParse(product['shopPrice'].toString()) ?? 0;
    final effectivePrice = (shopPrice - discount).clamp(0, shopPrice);
    final total = quantity * effectivePrice;

    try {
      final response = await ApiClient.dio.post(
        '/order/addtoorder',
        data: {
          'productId': productId,
          'quantity': quantity,
          'discount': discount,
          'total': total,
        },
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Stock updated successfully.")),
        );
      } else {
        print('Update failed: ${response.statusCode}');
      }
    } catch (e) {
      print('Error sending update: $e');
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
                final productId = product['productId'].toString();
                return Card(
                  margin: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 4,
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Weight: ${product['weight']}',
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            Text(
                              'Sales Price: ${product['salesPrice']}',
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            Text(
                              'Shop Price: ${product['shopPrice']}',
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,

                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  '(${product['packetsPerBundle']}p) Per bundle',
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                if (totals.containsKey(productId))
                                  Padding(
                                    padding: const EdgeInsets.only(top: 6),
                                    child: Align(
                                      alignment: Alignment.centerRight,
                                      child: Text(
                                        'Total: Rs. ${totals[productId]!.toStringAsFixed(2)}',
                                        style: const TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.blue,
                                        ),
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                SizedBox(
                                  width: 90,
                                  child: TextFormField(
                                    keyboardType: TextInputType.number,
                                    inputFormatters: [
                                      FilteringTextInputFormatter.digitsOnly,
                                    ],
                                    decoration: const InputDecoration(
                                      labelText: "Disc",
                                      isDense: true,
                                      contentPadding: EdgeInsets.symmetric(
                                        vertical: 8,
                                        horizontal: 10,
                                      ),
                                    ),
                                    style: const TextStyle(fontSize: 13),
                                    onChanged: (value) {
                                      final discount =
                                          double.tryParse(value) ?? 0;
                                      final qty =
                                          int.tryParse(
                                            updates[productId]?['quantity'] ??
                                                '0',
                                          ) ??
                                          0;
                                      final shopPrice =
                                          double.tryParse(
                                            product['shopPrice'].toString(),
                                          ) ??
                                          0;

                                      updates[productId] = {
                                        ...?updates[productId],
                                        'discount': value,
                                        'quantity':
                                            updates[productId]?['quantity'] ??
                                            '',
                                      };

                                      setState(() {
                                        // Make sure discount never exceeds shopPrice
                                        final effectivePrice = (shopPrice -
                                                discount)
                                            .clamp(0, shopPrice);
                                        totals[productId] =
                                            (qty * effectivePrice).toDouble();
                                      });
                                    },
                                  ),
                                ),
                                const SizedBox(width: 6),
                                SizedBox(
                                  width: 90,
                                  child: TextFormField(
                                    keyboardType: TextInputType.number,
                                    inputFormatters: [
                                      FilteringTextInputFormatter.digitsOnly,
                                    ],
                                    decoration: const InputDecoration(
                                      labelText: "Qty",
                                      isDense: true,
                                      contentPadding: EdgeInsets.symmetric(
                                        vertical: 8,
                                        horizontal: 10,
                                      ),
                                    ),
                                    style: const TextStyle(fontSize: 13),
                                    onChanged: (value) {
                                      final qty = int.tryParse(value) ?? 0;
                                      final discount =
                                          double.tryParse(
                                            updates[productId]?['discount'] ??
                                                '0',
                                          ) ??
                                          0;
                                      final shopPrice =
                                          double.tryParse(
                                            product['shopPrice'].toString(),
                                          ) ??
                                          0;

                                      updates[productId] = {
                                        ...?updates[productId],
                                        'quantity': value,
                                        'discount':
                                            updates[productId]?['discount'] ??
                                            '',
                                      };

                                      setState(() {
                                        final effectivePrice = (shopPrice -
                                                discount)
                                            .clamp(0, shopPrice);
                                        totals[productId] =
                                            (qty * effectivePrice).toDouble();
                                      });
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),

                        const SizedBox(height: 6),
                        Align(
                          alignment: Alignment.centerRight,
                          child: SizedBox(
                            height: 28,
                            child: ElevatedButton(
                              onPressed: () => submitStockUpdate(productId),
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                ),
                                textStyle: const TextStyle(fontSize: 13),
                              ),
                              child: const Text("Submit"),
                            ),
                          ),
                        ),
                      ],
                    ),
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
