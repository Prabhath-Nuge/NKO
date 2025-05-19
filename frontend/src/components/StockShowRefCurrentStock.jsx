import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const StockShowRefCurrentStock = () => {
  const location = useLocation();
  const ref = location.state?.ref;
  console.log(ref);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);


  const [refStockData, setRefStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStockUpdate = () => {
  const stockDelta = Number(newStock);

  if (newStock === '' || isNaN(stockDelta)) {
    alert('Please enter a valid number');
    return;
  }

  setUpdating(true);

  axios.post(`/stock/getRefCurrentStock/${selectedProduct.productId}`, {
    delta: stockDelta,
    refId: ref._id,
  })
    .then(() => {
      setShowModal(false);
      return axios.get(`/stock/getRefCurrentStock/${ref._id}`);
    })
    .then((res) => {
      if (res.data?.data) {
        setRefStockData(res.data.data);
        toast.success('Stock updated successfully!');
      }
    })
    .catch((err) => {
      toast.error('Error updating stock:', err.message);
    })
    .finally(() => {
      setUpdating(false);
    });
};




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
        toast.error('Error fetching ref stock data:', err.message);
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
                    onClick={() => {
                      setSelectedProduct({ ...product, category: category.name });
                      setNewStock(product.repStock);
                      setShowModal(true);
                    }}
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
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 space-y-4 transform transition-all scale-100 duration-200">
            <h3 className="text-xl font-bold text-gray-100">
              Adjust Stock
            </h3>
            <p className="text-sm text-gray-400">Current: {selectedProduct?.repStock}</p>
            <input
              type="number"
              onChange={(e) => setNewStock(e.target.value)}
              placeholder="e.g. 5 to add, -2 to remove"
              className="w-full p-2 border rounded bg-gray-400 text-black border-gray-400"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                onClick={handleStockUpdate}
                disabled={updating}
              >
                {updating ? 'Saving...' : 'Save'}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default StockShowRefCurrentStock;
