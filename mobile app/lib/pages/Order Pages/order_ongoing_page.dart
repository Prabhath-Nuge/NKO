import 'package:flutter/material.dart';
import 'package:nko/services/api_client.dart';
import 'package:blue_thermal_printer/blue_thermal_printer.dart';

class OngoingOrdersPage extends StatefulWidget {
  const OngoingOrdersPage({super.key});

  @override
  State<OngoingOrdersPage> createState() => _OngoingOrdersPageState();
}

class _OngoingOrdersPageState extends State<OngoingOrdersPage> {
  Map<String, dynamic>? order;
  bool isLoading = true;
  double todayTotal = 0;
  double shopDue = 0;
  String? shopName;
  List<dynamic> shopList = [];
  String? selectedShopId;
  final TextEditingController paymentController = TextEditingController();
  final BlueThermalPrinter printer = BlueThermalPrinter.instance;
  List<BluetoothDevice> devices = [];
  BluetoothDevice? selectedPrinter;

  @override
  void initState() {
    super.initState();
    fetchOngoingOrder();
    fetchShops();
    fetchUserIdFromSession();
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

  Future<void> fetchOngoingOrder() async {
    try {
      final session = await ApiClient.dio.get('/api/session');
      final repId = session.data['data']['_id'];

      final response = await ApiClient.dio.get(
        '/order/getOngoingOrders/$repId',
      );
      if (response.statusCode == 200) {
        final fetchedOrder = response.data['data'];
        final orderItems = fetchedOrder['orderItem'] as List<dynamic>;

        double total = orderItems.fold(0.0, (sum, item) {
          return sum + (item['total']?.toDouble() ?? 0.0);
        });
        if (!mounted) return;
        setState(() {
          order = fetchedOrder;
          todayTotal = total;
        });

        final shop = fetchedOrder['shopId'];
        if (shop != null && shop is Map && shop['_id'] != null) {
          if (!mounted) return;
          setState(() {
            shopDue = (shop['totalDebt'] ?? 0).toDouble();
            shopName = shop['name'];
          });
        }

        isLoading = false;
      } else {
        if (!mounted) return;
        setState(() {
          isLoading = false;
          order = null;
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        isLoading = false;
        order = null;
      });
      print('Error fetching order: $e');
    }
  }

  Future<void> fetchShops() async {
    final id = await fetchUserIdFromSession();
    try {
      final response = await ApiClient.dio.get('/shop/viewrefsshops/$id');
      if (response.statusCode == 200) {
        if (!mounted) return;
        setState(() {
          shopList = response.data['data'];
        });
      }
    } catch (e) {
      print('Error fetching shops: $e');
    }
  }

  Future<void> deleteOrder(String orderId) async {
    try {
      final response = await ApiClient.dio.delete('/order/delete/$orderId');
      print(response.data);
      if (response.statusCode == 200) {
        if (!mounted) return;
        setState(() {
          order = null;
        });
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text("Order deleted.")));
      }
    } catch (e) {
      print('Error deleting order: $e');
    }
  }

  Future<void> deleteProduct(String orderId, String variantId) async {
    try {
      final response = await ApiClient.dio.delete(
        '/order/deleteorderproduct',
        data: {"orderId": orderId, "variantId": variantId},
      );
      if (response.statusCode == 200) {
        fetchOngoingOrder();
      }
    } catch (e) {
      print('Error deleting product: $e');
    }
  }

  Future<void> scanPrinters() async {
    bool? isConnected = await printer.isConnected;

    if (selectedPrinter != null && isConnected != true) {
      try {
        await printer.connect(selectedPrinter!);
      } catch (e) {
        print("Printer connection error: $e");
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Failed to connect to printer.")),
          );
        }
        return;
      }
    }

    try {
      final paired = await printer.getBondedDevices();
      if (mounted) {
        setState(() => devices = paired);
      }
    } catch (e) {
      print("Error getting bonded devices: $e");
    }
  }

  Future<void> printOrder() async {
    if (selectedPrinter == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Select a printer first")));
      return;
    }

    try {
      bool? isConnected = await printer.isConnected;
      if (isConnected != true) {
        await printer.connect(selectedPrinter!);
      }
    } catch (e) {
      print("Printer connection error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to connect to printer.")),
      );
      return;
    }

    final items = order!['orderItem'] as List<dynamic>? ?? [];

    printer.printCustom("NKO PRODUCTS", 2, 1);
    printer.printNewLine();
    printer.printCustom("Order ID: ${order!['_id']}", 1, 0);
    printer.printCustom("Shop: ${shopName ?? 'N/A'}", 1, 0);
    printer.printCustom("Date: ${DateTime.now()}", 1, 0);
    printer.printCustom("----------------------------", 1, 1);
    printer.printNewLine();

    for (var item in items) {
      final product = item['variantId'] ?? {};
      final name = (product['category']?['name']) ?? 'Product';
      final weight = product['weight'] ?? '';
      final qty = item['quantity'] ?? 0;
      final discount = item['discount'] ?? 0;
      final total = item['total'] ?? 0;

      printer.printCustom("$name ($weight g)", 1, 0);
      final discountStr = (discount > 0) ? "Disc: Rs.$discount   " : "";
      printer.printCustom("${discountStr} Qty: $qty", 0, 0);
      printer.printCustom("Rs.$total", 1, 2);
      printer.printNewLine();
    }

    final due = (order!['due'] ?? 0).toDouble();
    final payed = (order!['payed'] ?? 0).toDouble();
    final remaining = (order!['remaining'] ?? 0).toDouble();
    final grandTotal = todayTotal + due;

    printer.printCustom("----------------------------", 1, 1);
    printer.printCustom(
      "Today's Total: Rs.${todayTotal.toStringAsFixed(2)}",
      1,
      0,
    );

    if (shopName != null) {
      printer.printCustom("Due:           Rs. ${due.toStringAsFixed(2)}", 1, 0);
      printer.printCustom(
        "Total+Due:     Rs. ${grandTotal.toStringAsFixed(2)}",
        1,
        0,
      );
      printer.printCustom(
        "Payed:         Rs. ${payed.toStringAsFixed(2)}",
        1,
        0,
      );
      printer.printCustom(
        "Remaining:     Rs. ${remaining.toStringAsFixed(2)}",
        1,
        0,
      );
    }
    printer.printCustom("----------------------------", 1, 1);
    printer.printNewLine();
    printer.printNewLine();
    printer.paperCut();
    await printer.disconnect();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:
          isLoading
              ? const Center(child: CircularProgressIndicator())
              : order == null
              ? const Center(child: Text("No ongoing orders found."))
              : SingleChildScrollView(
                padding: const EdgeInsets.all(12),
                child: Card(
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                "Order ID: ${order!['_id']} }",
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              onPressed: () => deleteOrder(order!['_id']),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        if (order!['shopId'] == null)
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                "Select Shop:",
                                style: TextStyle(fontWeight: FontWeight.w600),
                              ),
                              DropdownButton<String>(
                                hint: const Text("Choose a shop"),
                                value: selectedShopId,
                                items:
                                    shopList.map<DropdownMenuItem<String>>((
                                      shop,
                                    ) {
                                      return DropdownMenuItem<String>(
                                        value: shop['_id'],
                                        child: Text(shop['name']),
                                      );
                                    }).toList(),
                                onChanged: (value) async {
                                  if (value != null) {
                                    await ApiClient.dio.post(
                                      '/order/addShop',
                                      data: {
                                        "shopId": value,
                                        "orderId": order!['_id'],
                                      },
                                    );
                                    if (!mounted) return;
                                    setState(
                                      () => selectedShopId = null,
                                    ); // reset after assign
                                    fetchOngoingOrder();
                                  }
                                },
                              ),
                            ],
                          )
                        else
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                "Shop: $shopName",
                                style: const TextStyle(
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              IconButton(
                                icon: const Icon(
                                  Icons.close,
                                  color: Colors.red,
                                ),
                                onPressed: () async {
                                  await ApiClient.dio.post(
                                    '/order/removeshop',
                                    data: {"orderId": order!['_id']},
                                  );
                                  if (!mounted) return;
                                  setState(() {
                                    shopName = null;
                                    shopDue = 0;
                                  });
                                  fetchOngoingOrder();
                                },
                              ),
                            ],
                          ),

                        const SizedBox(height: 4),

                        const Divider(height: 24, thickness: 1),
                        Text(
                          "Today's Order Total: Rs.${todayTotal.toStringAsFixed(2)}",
                        ),
                        if (shopName != null) ...[
                          Text("Due: Rs. ${order!['due'] ?? 0}"),
                          Text(
                            "Grand Total (with shop dues): Rs. ${(todayTotal + shopDue).toStringAsFixed(2)}",
                          ),
                          Text("Payed: Rs. ${order!['payed'] ?? 0}"),
                          Text("Remaining: Rs. ${order!['remaining'] ?? 0}"),
                        ],

                        if (shopName != null) ...[
                          const SizedBox(height: 12),
                          const Text(
                            "Enter Payment Amount:",
                            style: TextStyle(fontWeight: FontWeight.w600),
                          ),
                          Row(
                            children: [
                              Expanded(
                                child: TextField(
                                  controller: paymentController,
                                  keyboardType: TextInputType.number,
                                  decoration: const InputDecoration(
                                    hintText: "Enter amount...",
                                    contentPadding: EdgeInsets.symmetric(
                                      horizontal: 12,
                                      vertical: 8,
                                    ),
                                    border: OutlineInputBorder(),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 10),
                              ElevatedButton(
                                onPressed: () async {
                                  final amount = int.tryParse(
                                    paymentController.text,
                                  );
                                  if (amount == null || amount <= 0) {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                        content: Text("Enter a valid amount."),
                                      ),
                                    );
                                    return;
                                  }

                                  try {
                                    final response = await ApiClient.dio.post(
                                      '/order/pay',
                                      data: {
                                        "orderId": order!['_id'],
                                        "amount": amount,
                                        "grandTotal": todayTotal + shopDue,
                                      },
                                    );

                                    if (response.statusCode == 200) {
                                      paymentController.clear();
                                      fetchOngoingOrder(); // refresh with updated payed/remaining
                                      ScaffoldMessenger.of(
                                        context,
                                      ).showSnackBar(
                                        const SnackBar(
                                          content: Text("Payment recorded."),
                                        ),
                                      );
                                    }
                                  } catch (e) {
                                    print("Payment error: $e");
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                        content: Text(
                                          "Failed to record payment.",
                                        ),
                                      ),
                                    );
                                  }
                                },
                                child: const Text("Submit"),
                              ),
                            ],
                          ),
                        ],

                        const Divider(thickness: 1, height: 24),
                        const Text(
                          "Items:",
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 8),
                        ...((order!['orderItem'] ?? []) as List<dynamic>).map((
                          item,
                        ) {
                          final product = item['variantId'];
                          final category = product['category'];
                          return Container(
                            margin: const EdgeInsets.symmetric(vertical: 6),
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: Colors.grey.shade100,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: Colors.grey.shade300),
                            ),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      if (category != null)
                                        Text(
                                          "Category: ${category['name'] ?? 'Unknown'}",
                                          style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      Text(
                                        "Weight: ${product['weight'] ?? 'N/A'}g",
                                      ),
                                      Text("Quantity: ${item['quantity']}"),
                                      Text("Discount: Rs. ${item['discount']}"),
                                      Text("Total: Rs. ${item['total']}"),
                                    ],
                                  ),
                                ),
                                IconButton(
                                  icon: const Icon(
                                    Icons.delete,
                                    color: Colors.red,
                                  ),
                                  onPressed:
                                      () => deleteProduct(
                                        order!['_id'],
                                        product['_id'],
                                      ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.start,

                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                ElevatedButton.icon(
                                  onPressed: scanPrinters,
                                  icon: const Icon(Icons.bluetooth_searching),
                                  label: const Text("Find Bluetooth Printers"),
                                ),

                                if (devices.isNotEmpty)
                                  DropdownButton<BluetoothDevice>(
                                    value: selectedPrinter,
                                    hint: const Text("Select Printer"),
                                    items:
                                        devices.map((d) {
                                          return DropdownMenuItem(
                                            value: d,
                                            child: Text(d.name ?? "Unknown"),
                                          );
                                        }).toList(),
                                    onChanged: (d) {
                                      if (!mounted) return;
                                      setState(() => selectedPrinter = d);
                                    },
                                  ),

                                const SizedBox(height: 10),
                                ElevatedButton.icon(
                                  onPressed: printOrder,
                                  icon: const Icon(Icons.print),
                                  label: const Text("Print Order"),
                                ),
                                const SizedBox(height: 10),
                                ElevatedButton.icon(
                                  onPressed: () async {
                                    final orderId = order!['_id'];
                                    final data = {
                                      "orderId": orderId,
                                      "todayTotal": todayTotal,
                                    };

                                    if (order!['shopId'] != null) {
                                      data.addAll({
                                        "shopId": order!['shopId']['_id'],
                                        "remaining": order!['remaining'] ?? 0,
                                      });
                                    }

                                    try {
                                      final response = await ApiClient.dio.post(
                                        '/order/finish',
                                        data: data,
                                      );
                                      if (response.statusCode == 200) {
                                        if (!mounted) return;
                                        ScaffoldMessenger.of(
                                          context,
                                        ).showSnackBar(
                                          const SnackBar(
                                            content: Text(
                                              "Order marked as finished.",
                                            ),
                                          ),
                                        );
                                        fetchOngoingOrder(); // Optionally refresh the state
                                      } else {
                                        print(
                                          response.data['message'].toString(),
                                        );
                                        if (!mounted) return;
                                        ScaffoldMessenger.of(
                                          context,
                                        ).showSnackBar(
                                          SnackBar(
                                            content: Text(
                                              response.data['message']
                                                  .toString(),
                                            ),
                                          ),
                                        );
                                      }
                                    } catch (e) {
                                      print("Finish order error: $e");
                                      if (!mounted) return;
                                      ScaffoldMessenger.of(
                                        context,
                                      ).showSnackBar(
                                        const SnackBar(
                                          content: Text(
                                            "Something went wrong.",
                                          ),
                                        ),
                                      );
                                    }
                                  },
                                  icon: const Icon(Icons.check_circle),
                                  label: const Text("Finish Order"),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.green,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
    );
  }
}
