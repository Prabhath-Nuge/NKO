import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ProductCategoryEdit = () => {
    const { id } = useParams();
    const location = useLocation();
    const category = location.state?.category;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: category._id, // Assume you're editing product with ID 123
        name: category.name,
        description: category.description,
        imageUrl: category.image,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleDelete = () => {
    };

    return (
        <div data-aos="fade-up">
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6"
            >
                <h1 className="text-3xl font-bold text-gray-900">Edit Product Details</h1>

                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    hidden
                />

                <div className="space-y-4">
                    <div >
                        <label className="block text-sm text-gray-500 mb-1 ">Current Image</label>
                        <img
                            src={formData.imageUrl}
                            alt="Product"
                            className="w-64 h-64 object-cover border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter image URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product description"
                            rows={4}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition"
                >
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
                >
                    Delete Product!
                </button>
            </form>
        </div>
    );
};

export default ProductCategoryEdit;
