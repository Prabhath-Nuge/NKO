import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext'; // adjust path as needed

const StockEdit = () => {
  const location = useLocation();
  const variant = location.state?.variant;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    changeAmount: '',
    changeReason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      variantId: variant._id,
      changeAmount: Number(formData.changeAmount),
      changedBy: user.name,
      changeDate: Date.now(),
      changeReason: formData.changeReason,
    };

    try {
      const response = await axios.post('/stock/change', data);      

      if(formData.changeAmount === 0 || formData.changeReason === '') {
        return toast.error('Please provide a valid change amount and reason.');
      }

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success('Stock updated successfully');
        navigate(-1, { replace: true });
      }
    } catch (error) {
      toast.error(`Error updating stock: ${error.response?.data?.message || error.message}`);
    }
  };

  const formattedDate = new Date().toLocaleString(); // human-readable date

  return (
    <div data-aos="fade-up">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-xl shadow-md space-y-6 text-white"
      >
        <h1 className="text-3xl font-bold">Edit Stock for Variant</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Current Stock</label>
            <input
              type="number"
              value={variant.currentStock}
              disabled
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Current Date</label>
            <input
              type="text"
              value={formattedDate}
              disabled
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Change Amount</label>
            <input
              type="number"
              name="changeAmount"
              value={formData.changeAmount}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount to increase/decrease"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Change Reason</label>
            <input
              type="text"
              name="changeReason"
              value={formData.changeReason}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Reason for stock change"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition"
        >
          Save Stock Change
        </button>
      </form>
    </div>
  );
};

export default StockEdit;
