import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function NewProductCategoryComponent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', description: '', image: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, image } = formData;

    if (!name) return toast.error('Category name is required');
    if (name.length < 3) return toast.error('Category name must be at least 3 characters');

    const categoryData = { name, description, image };

    try {
      const res = await axios.post('/product/category', categoryData);
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || 'Failed to add category');
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || 'An error occurred. Please try again.');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setFormData({ name: '', description: '', image: '' });
      navigate('/products/category', { replace: true });
    }
  };

  return (
    <div data-aos="fade-up" className="flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 drop-shadow-[0_10px_20px_rgba(26,60,150,0.2)]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 bg-opacity-20 rounded-full mb-4">
              <i className="fas fa-tags text-blue-400 fa-lg"></i>
            </div>
            <h2 className="text-2xl font-bold text-white">Add Product Category</h2>
            <p className="text-gray-400 mt-2">Create a new product category</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  placeholder="Enter category name"
                />
                <i className="fas fa-tag absolute right-3 top-4 text-gray-500"></i>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category Description</label>
              <div className="relative">
                <input
                  type="text"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  placeholder="Enter category description"
                />
                <i className="fa-solid fa-file-lines absolute right-3 top-4 text-gray-500"></i>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category Image</label>
              <div className="relative">
                <input
                  type="text"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  placeholder="Enter category image URL"
                />
                <i className="fa-solid fa-image absolute right-3 top-4 text-gray-500"></i>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
            >
              Add Category
            </button>

            <p className="mt-6 text-center text-gray-400">
              Go back to
              <Link
                to="/products"
                className="ml-1 text-blue-400 hover:text-blue-500 font-semibold focus:outline-none"
              >
                Products
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProductCategoryComponent;
