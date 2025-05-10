import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const StockHistory = () => {
  const [stockHistory, setStockHistory] = useState([])

  useEffect(() => {
    axios.get('/stock/history')
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.message)
        } else {
          setStockHistory(response.data.data)
        }
      })
      .catch((error) => {
        toast.error('Error fetching stock history')
        console.error('Error:', error)
      })
  }, [])

  return (
    <section id="stock-history" className="py-4">
      <div className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></div>
      <div className="container mx-auto px-4">
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stock History</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Review recent changes to product stock levels, including who made the changes and the reasons behind them.
          </p>
        </div>

        <div data-aos="fade-up" className="max-w-6xl mx-auto space-y-4">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 bg-gray-700 p-4 rounded-lg text-white font-bold text-sm">
            <div>Product</div>
            <div>Variant</div>
            <div>Changed By</div>
            <div>Change</div>
            <div>Reason</div>
            <div>Date & Time</div>
          </div>

          {/* Rows */}
          {stockHistory.length === 0 ? (
            <p className="text-white text-center mt-4">No stock history available.</p>
          ) : (
            stockHistory.map((entry, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 bg-gray-800 p-4 rounded-md text-white text-sm hover:bg-gray-700 transition"
              >
                <div>{entry.variantId?.category?.name || 'N/A'}</div>
                <div>{entry.variantId?.weight || 'N/A'}</div>
                <div>{entry.changedBy}</div>
                <div>{entry.changeAmount > 0 ? `+${entry.changeAmount}` : entry.changeAmount}</div>
                <div>{entry.changeReason}</div>
                <div>{new Date(entry.changeDate).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default StockHistory
