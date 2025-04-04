import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function NewProductCategoryComponent() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', description: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description } = formData;
        if (!name) {
            return toast.error('Category name is required');
        }
        if (name.length < 3) {
            return toast.error('Category name must be at least 3 characters');
        }
        const categoryData = {
            name: name,
            description: description
        };

        const senddata = await axios.post('/product/category', categoryData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message || 'Failed to add category');
                }
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        toast.error('Invalid name or description. Please try again.');
                    } else {
                        toast.error('An error occurred. Please try again: ' + err.response.data.message);
                    }
                } else {
                    toast.error('Network error or request failed. Please try again.');
                }
            }).finally(() => {
                setFormData({ name: '', description: '' });
                navigate('/products/category', {replace:true});
            });
    }
    return (
        <div className=" flex items-center justify-center p-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <i className="fas fa-tags text-blue-600 fa-lg"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Add Product Category</h2>
                        <p className="text-gray-600 mt-2">Create a new product category</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                            <div className="relative">
                                <input type="text" name="name" required
                                    value={formData.name}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                    placeholder="Enter category name"
                                    onChange={handleChange} />
                                <i className="fas fa-tag absolute right-2 top-4 text-gray-400"></i>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category Description</label>
                            <div className="relative">
                                <input type="text" name="description" required
                                    value={formData.description}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                    placeholder="Enter category Description"
                                    onChange={handleChange} />
                                <i className="fa-solid fa-file-lines absolute right-2 top-4 text-gray-400"></i>
                            </div>
                        </div>
                        <button type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors">
                            Add Category
                        </button>
                        <p className="mt-6 text-center text-gray-600">
                            Go back to
                            <Link to='/products' className="ml-1 text-blue-600 hover:text-blue-700 font-semibold focus:outline-none">
                                Products
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewProductCategoryComponent