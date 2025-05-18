import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const StockShowRefCurrentStock = () => {
  const { id } = useParams(); // If you want to use id from the route
  const location = useLocation();
  const ref = location.state?.ref;

  const [refStockData, setRefStockData] = useState([]);

  useEffect(() => {
    if (!ref) return;

    axios.get(`/api/refstock/${ref._id}`) // You can adjust the API path
      .then((res) => {
        if (res.data?.data) {
          setRefStockData(res.data.data.variant); // Assuming variants are in .data.variant
        }
      })
      .catch((err) => {
        console.error('Error fetching ref stock data:', err.message);
      });
  }, [ref]);

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

        {/* Left: Ref Info */}
        <div className="w-67 lg:67 space-y-4 bg-gray-800 rounded-lg p-4 text-white text-center">
          <h2 className="text-3xl font-bold">{ref?.name}</h2>
          <p className="text-gray-300">{ref?.email}</p>
        </div>

        {/* Right: Ref Stock Variant Info */}
        <div className="w-full lg:w-3/4 space-y-4">
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg">
            <div>Category</div>
            <div>Variant</div>
            <div>Quantity</div>
          </div>

          {refStockData.length > 0 ? (
            refStockData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-4 bg-gray-800 text-white rounded-md hover:bg-blue-900 transition"
              >
                <div>{item?.variantId?.category?.name || '—'}</div>
                <div>{item?.variantId?.weight || '—'}</div>
                <div>{item?.quantity}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic mt-2">No variant history found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StockShowRefCurrentStock