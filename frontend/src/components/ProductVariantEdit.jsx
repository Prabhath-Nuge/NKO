import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductVariantEdit = () => {
  const location = useLocation();
  const variant = location.state?.variant;
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    weight: variant.weight,
    salesPrice: variant.salesPrice,
    shopPrice: variant.shopPrice,
    packetsPerBundle: variant.packetsPerBundle,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/product/editvariant/${variant._id}`, formData);
      if (response.data.error) {
        toast.error(response.data.message);
        console.log(response);
        
      }
      else if (response.error) {
        toast.error("Error updating variant:", response.error);
      }
      else {
        toast.success("Variant updated successfully");
        navigate(-1, { replace: true });
      }
    } catch (error) {
      toast.error("Error updating variant:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this variant?");

    if (confirmDelete) {
      try {

      } catch (error) {

      }
    } else {
      console.log("Variant deletion cancelled.");
    }
  };

  return (
    <div data-aos="fade-up">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-xl shadow-md space-y-6 text-white"
      >
        <h1 className="text-3xl font-bold">Edit Product Variant</h1>

        <div className="space-y-4">

          <div>
            <label className="block text-sm text-gray-300 mb-1">Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter variant weight"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Sales Price:</label>
            <input
              type="text"
              name="salesPrice"
              value={formData.salesPrice}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sales price"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Shop Price:</label>
            <input
              type="text"
              name="shopPrice"
              value={formData.shopPrice}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shop price"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Packets Per Bundle:</label>
            <input
              type="text"
              name="packetsPerBundle"
              value={formData.packetsPerBundle}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Packets Per Bundle"
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
          Delete Variant
        </button>
      </form>
    </div>
  );
};

export default ProductVariantEdit;
