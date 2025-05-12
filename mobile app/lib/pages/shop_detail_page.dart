import 'package:flutter/material.dart';
import 'package:nko/services/api_client.dart';

class ShopDetailPage extends StatefulWidget {
  final String shopId;

  const ShopDetailPage({super.key, required this.shopId});

  @override
  State<ShopDetailPage> createState() => _ShopDetailPageState();
}

class _ShopDetailPageState extends State<ShopDetailPage> {
  Map<String, dynamic>? shopData;
  bool isLoading = true;

  late TextEditingController nameController;
  late TextEditingController ownerController;
  late TextEditingController contactController;
  late TextEditingController addressController;

  @override
  void initState() {
    super.initState();
    fetchShopDetails();
  }

  Future<void> fetchShopDetails() async {
    try {
      final response = await ApiClient.dio.get('/shop/${widget.shopId}');

      setState(() {
        shopData = response.data['data'];
        isLoading = false;
      });
      nameController = TextEditingController(text: shopData?['name'] ?? '');
      ownerController = TextEditingController(text: shopData?['owner'] ?? '');
      contactController = TextEditingController(
        text: shopData?['contact'].toString() ?? '',
      );
      addressController = TextEditingController(
        text: shopData?['address'] ?? '',
      );
    } catch (e) {
      print("Error fetching shop details: $e");
      setState(() => isLoading = false);
    }
  }

  @override
  void dispose() {
    nameController.dispose();
    ownerController.dispose();
    contactController.dispose();
    addressController.dispose();
    super.dispose();
  }

  void _showSnackbar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.redAccent : Colors.green,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  Future<bool> updateShopDetails() async {
    final name = nameController.text.trim();
    final owner = ownerController.text.trim();
    final contact =
        int.tryParse(contactController.text.replaceAll(RegExp(r'\D'), '')) ?? 0;
    final address = addressController.text.trim();

    if (name.isEmpty) {
      _showSnackbar("Name required!", isError: true);
      return false;
    }

    try {
      final response = await ApiClient.dio.post(
        '/shop/edit/${widget.shopId}',
        data: {
          'name': name,
          'owner': owner,
          'contact': contact,
          'address': address,
        },
      );

      final data = response.data;
      final message = data['message'];

      if (response.statusCode == 200) {
        _showSnackbar(message, isError: false);
        return true;
      } else {
        _showSnackbar(message, isError: true);
        return false;
      }
    } catch (e) {
      _showSnackbar(e.toString(), isError: true);
      return false;
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
      body:
          isLoading
              ? const Center(child: CircularProgressIndicator())
              : shopData == null
              ? const Center(child: Text("Failed to load shop details."))
              : SingleChildScrollView(
                padding: const EdgeInsets.all(16.0),
                child: Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Shop Details",
                          style: TextStyle(
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                            color: Colors.blueAccent,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            const Icon(Icons.store, color: Colors.blueAccent),
                            const SizedBox(width: 8),
                            Expanded(
                              child: TextField(
                                controller: nameController,
                                decoration: const InputDecoration(
                                  labelText: "Name",
                                  border: OutlineInputBorder(),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            const Icon(Icons.person, color: Colors.blueAccent),
                            const SizedBox(width: 8),
                            Expanded(
                              child: TextField(
                                controller: ownerController,
                                decoration: const InputDecoration(
                                  labelText: "Owner",
                                  border: OutlineInputBorder(),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            const Icon(Icons.phone, color: Colors.blueAccent),
                            const SizedBox(width: 8),
                            Expanded(
                              child: TextField(
                                controller: contactController,
                                decoration: const InputDecoration(
                                  labelText: "Contact",
                                  border: OutlineInputBorder(),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            const Icon(
                              Icons.location_on,
                              color: Colors.blueAccent,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: TextField(
                                controller: addressController,
                                decoration: const InputDecoration(
                                  labelText: "Address",
                                  border: OutlineInputBorder(),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            const Icon(
                              Icons.attach_money,
                              color: Colors.blueAccent,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                "Total Debt: \$${(shopData!['total_debt'] is num ? shopData!['total_debt'].toDouble() : double.tryParse(shopData!['total_debt'].toString()) ?? 0.0).toStringAsFixed(2)}",
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w600,
                                  color: Colors.redAccent,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        Center(
                          child: ElevatedButton(
                            onPressed: () async {
                              final success = await updateShopDetails();
                              if (success) {
                                Navigator.pop(context, true);
                              }
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blueAccent,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: const Text(
                              "Update",
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
    );
  }
}
