import 'package:flutter/material.dart';
import 'package:nko/pages/order_details_page.dart';
import 'package:nko/services/api_client.dart';

class DoneOrdersPage extends StatefulWidget {
  const DoneOrdersPage({super.key});

  @override
  State<DoneOrdersPage> createState() => _DoneOrdersPageState();
}

class _DoneOrdersPageState extends State<DoneOrdersPage> {
  List<dynamic> orders = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchOrders();
  }

  Future<void> fetchOrders() async {
    try {
      final session = await ApiClient.dio.get('/api/session');
      final repId = session.data['data']['_id'];

      final response = await ApiClient.dio.get(
        '/order/refgetdoneorders/$repId',
      );

      if (response.statusCode == 200) {
        setState(() {
          orders = response.data['data'];
          isLoading = false;
        });
      }
    } catch (e) {
      print("Error fetching done orders: $e");
      if (!mounted) return;
      setState(() => isLoading = false);
    }
  }

  Future<void> saveBatch() async {
    try {
      final session = await ApiClient.dio.get('/api/session');
      final repId = session.data['data']['_id'];

      final response = await ApiClient.dio.post(
        '/order/saveBatch',
        data: {'repId': repId},
      );
      final data = response.data;

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text(data['message'].toString())));
        // Optionally re-fetch orders after saving
        fetchOrders();
      } else {
        throw Exception("Failed to save batch");
      }
    } catch (e) {
      print("Save batch error: $e");
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Failed to save batch")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Completed Orders')),
      body:
          isLoading
              ? const Center(child: CircularProgressIndicator())
              : orders.isEmpty
              ? const Center(child: Text('No completed orders found.'))
              : ListView.builder(
                itemCount: orders.length,
                itemBuilder: (context, index) {
                  final order = orders[index];
                  final shopName = order['shopId']?['name'] ?? 'No Shop';
                  final totalItems = order['orderItem']?.length ?? 0;
                  final date = order['date'] ?? 'N/A';

                  return Card(
                    margin: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    child: ListTile(
                      title: Text("Shop: $shopName"),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Items: $totalItems"),
                          Text("Date: $date"),
                        ],
                      ),
                      trailing: const Icon(Icons.arrow_forward),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => OrderDetailsPage(order: order),
                          ),
                        );
                      },
                    ),
                  );
                },
              ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: saveBatch,
        icon: const Icon(Icons.save),
        label: const Text("Save Batch"),
      ),
    );
  }
}
