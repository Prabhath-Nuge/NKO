import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderBatchOrderListView = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <p className="text-gray-400 text-center mt-10">No order data provided.</p>;

  const formattedDate = new Date(order.date).toLocaleDateString();
  const formattedTime = new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Order Details</h1>

        <div className="bg-gray-800 rounded-lg p-6 text-white mb-8 shadow-md">
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Time:</strong> {formattedTime}</p>
          <p><strong>Shop:</strong> {order.shopId?.name || 'N/A'}</p>
          <p><strong>Batch:</strong> {order.batch}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center text-lg">
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-blue-300 font-semibold">Total</p>
              <p>Rs {order.total || 0}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-blue-300 font-semibold">Paid</p>
              <p>Rs {order.payed || 0}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-blue-300 font-semibold">Due</p>
              <p>Rs {order.due || 0}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <p className="text-blue-300 font-semibold">Remaining</p>
              <p>Rs {order.remaining || 0}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Ordered Items</h2>

        <div className="space-y-4">
          {order.orderItem?.map((item, index) => (
            <div
              key={index}
              className="bg-gray-700 text-white p-4 rounded-md shadow hover:bg-blue-900 transition"
            >
              <p><strong>Category:</strong> {item.variantId?.category?.name || 'N/A'}</p>
              <p><strong>Product:</strong> {item.variantId?.weight || 'N/A'}g</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Discount:</strong> Rs {item.discount}</p>
              <p><strong>Total:</strong> Rs {item.total}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBatchOrderListView;
