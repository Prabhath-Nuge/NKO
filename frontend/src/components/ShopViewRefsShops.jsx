import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const ShopViewRefsShops = () => {
  const location = useLocation();
  const ref = location.state?.ref;
  

  const [shops, setShops] = useState([]);

  useEffect(() => {
    if (!ref?._id) return;
    axios.get(`/shop/viewrefsshops/${ref._id}`)
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
  }, [ref]);

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <div className="w-67 lg:67 space-y-4 bg-gray-800 rounded-lg p-4 text-center">
          <h2 className="text-3xl font-bold text-white">Representative</h2>
          <p className="text-xl text-blue-300">{ref?.name}</p>
          <p className="text-gray-300">{ref?.email}</p>
        </div>

        <div className="w-full lg:w-2/3 space-y-4">
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg">
            <div>Shop Name</div>
            <div>Owner</div>
            <div>Contact</div>
            <div>Address</div>
            <div>Total Debt</div>
          </div>

          {shops.length > 0 ? (
            shops.map((shop) => (
              <div
                key={shop._id}
                className="grid grid-cols-5 gap-4 p-4 bg-gray-800 text-white rounded-md transition hover:bg-blue-900 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="font-medium">{shop.name}</div>
                <div className="text-gray-300">{shop.owner}</div>
                <div className="text-gray-300">{shop.contact}</div>
                <div className="text-gray-300">{shop.address}</div>
                <div className={`${shop.totalDebt === 0 ? "text-green-400" : "text-red-400"} font-semibold`}>Rs {shop.totalDebt}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic mt-2">No shops found for this Representative.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopViewRefsShops;
