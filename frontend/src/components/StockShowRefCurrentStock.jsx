import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const StockShowRefCurrentStock = () => {
  const { id } = useParams();
  const location = useLocation();
  const ref = location.state?.ref;

  const [refStockData, setRefStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) return;

    setLoading(true);

    axios.get(`/stock/getRefCurrentStock/${ref._id}`)
      .then((res) => {
        if (res.data?.data) {
          setRefStockData(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching ref stock data:', err.message);
      })
      .finally(() => setLoading(false));
  }, [ref]);

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

        <div className="w-67 lg:67 space-y-4 bg-gray-800 rounded-lg p-4 text-white text-center">
          <h2 className="text-3xl font-bold">{ref?.name}</h2>
          <p className="text-gray-300">{ref?.email}</p>
        </div>

        <div className="w-full lg:w-3/4 space-y-3">
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg">
            <div>Category</div>
            <div>Variant (Weight)</div>
            <div>Quantity</div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-white border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : refStockData.length > 0 ? (
            refStockData.map((category, index) => (
              <React.Fragment key={index}>
                {category.products.map((product, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 gap-4 p-4 bg-gray-800 text-white rounded-md hover:bg-blue-900 transition hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div>{category.name}</div>
                    <div>{product.weight}g</div>
                    <div>{product.repStock}</div>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <p className="text-gray-400 italic mt-2">No stock data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockShowRefCurrentStock;
