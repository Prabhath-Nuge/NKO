import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderBatchOrderList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const batch = location.state?.batch;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!batch?.batchNumber) return;

    axios.get(`/order/batchorderlist/${batch.batchNumber}`)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message);
        } else {
          setOrders(res.data.data || []);
        }
      })
      .catch((err) => {
        toast.error('Error fetching batch orders');
        console.error(err);
      });
  }, [batch]);

  return (
    <div className="px-6 py-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">Orders for Batch</h2>
        <p className="text-blue-400 text-xl mt-2">{batch?.batchNumber}</p>
        <p className="text-gray-400">{new Date(batch?.date).toLocaleDateString()}</p>
      </div>

      <div className="w-full space-y-4">
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg">
          <div>Date</div>
          <div>Time</div>
          <div>Shop</div>
          <div>Total</div>
          <div>Paid</div>
          <div>Remaining</div>
        </div>

        {orders.length > 0 ? (
          orders.map((order) => {
            const dateObj = new Date(order.date);
            const date = dateObj.toLocaleDateString();
            const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={order._id}
                className="grid grid-cols-6 gap-4 p-4 bg-gray-800 text-white rounded-md transition hover:bg-blue-900 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                onClick={() => navigate(`order`, { state: { order } })}
              >
                <div>{date}</div>
                <div>{time}</div>
                <div>{order.shopId?.name || 'N/A'}</div>
                <div className="text-blue-300 font-semibold">Rs {order.total || 0}</div>
                <div>Rs {order.payed || 0}</div>
                <div>Rs {order.remaining || 0}</div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 italic mt-2">No orders found for this batch.</p>
        )}
      </div>
    </div>
  );
};

export default OrderBatchOrderList;
