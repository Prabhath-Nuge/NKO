import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function AddProductComponent() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [salesPrice, setSalesPrice] = useState('');
  const [shopPrice, setShopPrice] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    axios.get('/product/category')
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.message);
        } else {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      category: selectedCategory,
      salesPrice,
      shopPrice,
      weight,
    };
    axios.post('/product/addnewproduct', formData)
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          toast.success('Product added successfully!');
          setSelectedCategory('');
          setSalesPrice('');
          setShopPrice('');
          setWeight('');
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div data-aos="fade-up" className="flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl drop-shadow-[0_10px_20px_rgba(26,60,150,0.2)] p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 bg-opacity-20 rounded-full mb-4">
              <i className="fas fa-tags text-blue-400 fa-lg"></i>
            </div>
            <h2 className="text-2xl font-bold text-white">Add Product</h2>
            <p className="text-gray-400 mt-2">Create a new product entry</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Category Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Category</label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Weight (grams)</label>
              <input
                type="text"
                name="weight"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                placeholder="Enter product weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Sales Price Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Sales Price (Rs)</label>
              <input
                type="text"
                name="salesprice"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                placeholder="Enter sales price"
                value={salesPrice}
                onChange={(e) => setSalesPrice(e.target.value)}
              />
            </div>

            {/* Shop Price Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Shop Price (Rs)</label>
              <input
                type="text"
                name="shopprice"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                placeholder="Enter shop price"
                value={shopPrice}
                onChange={(e) => setShopPrice(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
            >
              Add Product
            </button>

            {/* Back Link */}
            <p className="mt-6 text-center text-gray-400">
              Go back to
              <Link to="/products" className="ml-1 text-blue-400 hover:text-blue-500 font-semibold focus:outline-none">
                Products
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductComponent;
