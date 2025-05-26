import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const StockRefStockDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const batchdet = location.state?.batch;
  const [record, setRecord] = useState(null);

  useEffect(() => {
    if (!batchdet?.batchId) return;

    axios.get(`/stock/getRefStockHistoryByBatch/${batchdet.batchId}`)
      .then(res => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          setRecord(res.data.data); // ✅ single object
          console.log("Record:", res.data.data);
        }
      })
      .catch(err => {
        toast.error('Failed to load stock details');
        console.error(err);
      });
  }, [batchdet?.batchId]);

  const handleRestock = async (id) => {
    try {
      const res = await axios.get(`/stock/restock/${id}`);

      if (res.data.success) {
        toast.success('Restock successful');
        navigate(-1, { replace: true });
      } else {
        toast.error(res.data.message || 'Restock failed');
      }
    } catch (err) {
      console.error('Restock error:', err);
      toast.error('Something went wrong while restocking');
    }
  };



  if (!record) return <p className="text-white text-center mt-10">Loading...</p>;

  const formattedDate = new Date(record.date).toLocaleDateString();
  const formattedTime = new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="px-6 py-10">
      <div className="max-w-3xl mx-auto text-white space-y-10">
        <h1 className="text-3xl font-bold text-center">Ref Stock History</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow space-y-2">
          <p><strong>Representative:</strong> {record.repId?.name || 'N/A'} ({record.repId?.email})</p>
          <p><strong>Date:</strong> {formattedDate} – {formattedTime}</p>
          <p><strong>Batch ID:</strong> {record.batchId}</p>
          {/* Only show button if record.batchId !== 'saved' */}
          {record.type !== 'saved' && (
            <button
              className="px-4 py-2 rounded bg-blue-800 text-white"
              onClick={() => handleRestock(record.batchId)}
            >
              Restock
            </button>
          )}
        </div>

        <h2 className="text-2xl font-semibold mt-6">Variants</h2>

        {record.variant?.length > 0 ? (
          <div className="space-y-4">
            {record.variant.map((v, i) => (
              <div key={i} className="bg-gray-700 p-4 rounded shadow">
                <p><strong>Weight:</strong> {v.variantId?.weight || 'N/A'}g</p>
                <p><strong>Category:</strong> {v.variantId?.category?.name || 'N/A'}</p>
                <p><strong>Quantity:</strong> {v.quantity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No variant data available.</p>
        )}
      </div>
    </div>
  );
};

export default StockRefStockDetail;
