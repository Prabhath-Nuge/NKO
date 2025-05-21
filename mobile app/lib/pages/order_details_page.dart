import 'package:flutter/material.dart';

class OrderDetailsPage extends StatelessWidget {
  final Map<String, dynamic> order;

  const OrderDetailsPage({super.key, required this.order});

  @override
  Widget build(BuildContext context) {
    final shopName = order['shopId']?['name'] ?? '';
    final items = order['orderItem'] as List<dynamic>? ?? [];

    return Scaffold(
      appBar: AppBar(title: const Text('Order Details')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Shop: $shopName",
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text("Date: ${order['date'] ?? ''}"),
            Text('Total Amount: Rs.${order['total'] ?? ''}'),
            Text('Due Amount: Rs.${order['due'] ?? ''}'),
            Text('Payed Amount: Rs.${order['payed'] ?? ''}'),
            Text('New Due Amount: Rs.${order['remaining'] ?? ''}'),
            const Divider(height: 20),
            const Text("Items:", style: TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                itemCount: items.length,
                itemBuilder: (_, index) {
                  final item = items[index];
                  final variant = item['variantId'];
                  final name =
                      (variant is Map)
                          ? variant['name'] ?? 'Product'
                          : 'Product';
                  final qty = item['quantity'];
                  final total = item['total'];

                  return ListTile(
                    title: Text(name),
                    subtitle: Text("Qty: $qty  |  Total: Rs.$total"),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
