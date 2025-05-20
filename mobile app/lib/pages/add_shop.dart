import 'package:flutter/material.dart';
import 'package:nko/services/api_client.dart';

class AddShopPage extends StatelessWidget {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController ownerController = TextEditingController();
  final TextEditingController contactController = TextEditingController();
  final TextEditingController addressController = TextEditingController();

  Future<bool> submit(BuildContext context) async {
    final name = nameController.text.trim();
    final owner = ownerController.text.trim();
    final contact = contactController.text.trim();
    final address = addressController.text.trim();

    if (name.isEmpty) {
      _showSnackbar(context, "Name is required!", isError: false);
      return false;
    }

    try {
      final response = await ApiClient.dio.post(
        '/shop',
        data: {
          'name': name,
          'owner': owner,
          'contact': contact,
          'address': address,
        },
      );

      final data = response.data;
      final message = data['message'];
      final code = response.statusCode;

      if (code == 200) {
        _showSnackbar(context, message, isError: false);
        return true;
      } else {
        _showSnackbar(context, message, isError: true);
        return false;
      }

      // Handle success response
    } catch (e) {
      _showSnackbar(context, e.toString(), isError: true);
      return false;
    }
  }

  void _showSnackbar(
    BuildContext context,
    String message, {
    bool isError = false,
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.redAccent : Colors.green,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Text(
                  'Add a New Shop',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ),
              SizedBox(height: 30),
              TextField(
                controller: nameController,
                decoration: InputDecoration(
                  labelText: 'Shop Name',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 16),
              TextField(
                controller: ownerController,
                decoration: InputDecoration(
                  labelText: 'Owner Name',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 16),
              TextField(
                controller: contactController,
                decoration: InputDecoration(
                  labelText: 'Contact',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.phone,
              ),
              SizedBox(height: 16),
              TextField(
                controller: addressController,
                decoration: InputDecoration(
                  labelText: 'Address',
                  border: OutlineInputBorder(),
                ),
                maxLines: 3,
              ),
              SizedBox(height: 24),
              Center(
                child: ElevatedButton(
                  onPressed: () async {
                    final success = await submit(context);
                    if (success) {
                      Navigator.pop(context);
                    }
                  },
                  child: Text('Submit'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
