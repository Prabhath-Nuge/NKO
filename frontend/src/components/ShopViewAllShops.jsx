import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ShopViewAllShops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get('/shop/allshops')
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          setShops(response.data.data);
        }
      })
      .catch((error) => {
        toast.error('Failed to load shops.');
        console.error(error.message);
      });
  }, []);

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-white text-center mb-6">All Shops</h2>

      <div className="w-full max-w-7xl mx-auto space-y-4">
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg text-center">
          <div>Shop Name</div>
          <div>Owner</div>
          <div>Contact</div>
          <div>Address</div>
          <div>Representative</div>
          <div>Total Debt</div>
        </div>

        {shops.length > 0 ? (
          shops.map((shop) => (
            <div
              key={shop._id}
              className="grid grid-cols-6 gap-4 p-4 bg-gray-800 text-white rounded-md text-center transition hover:bg-blue-900 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="font-medium">{shop.name}</div>
              <div className="text-gray-300">{shop.owner}</div>
              <div className="text-gray-300">{shop.contact}</div>
              <div className="text-gray-300">{shop.address}</div>
              <div className="text-gray-300">{shop.refId.name}</div>
              <div className={`${shop.totalDebt === 0 ? 'text-green-400' : 'text-red-400'} font-semibold`}>
                Rs {shop.totalDebt}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic text-center mt-2">No shops found.</p>
        )}
      </div>
    </div>
  );
}

export default ShopViewAllShops