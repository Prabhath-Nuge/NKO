import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';

const StockPastStockBatch = () => {
    const location = useLocation();
    const ref = location.state?.ref;
    const [batchData, setBatchData] = useState([]);

    useEffect(() => {
        if (!ref) {
            console.error("No ref data found in location state.");
            return;
        }
        axios.get(`/stock/getrefpaststockbatch/${ref._id}`)
            .then((res) => {
                if (res.data?.data) {
                    setBatchData(res.data.data);
                } else {
                    toast.error("No batch data found in response.");
                }
            })
            .catch((err) => {
                toast.error("Error fetching batch data:", err);
            });
    }, [ref]);

    return (
        <div className="px-6 py-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                {/* Left: Rep Info (Static) */}
                <div className="w-full lg:w-1/3 space-y-4 bg-gray-800 rounded-lg p-4 text-white text-center">
                    <h2 className="text-3xl font-bold">{ref?.name}</h2>
                    <p className="text-gray-300">{ref?.email}</p>
                </div>

                {/* Right: Batches (Iterative) */}
                <div className="w-full lg:w-2/3 space-y-4">
                    {batchData.length > 0 ? (
                        batchData.map((batch, index) => (
                            <Link to='batch' state={{ batch }} key={index}>
                                <div
                                    key={index}
                                    className={`rounded-lg p-4 text-white shadow-md hover:scale-101 transition mb-4 ${batch.type === 'ongoing' ? 'bg-red-900 text-black hover:bg-red-800' : 'bg-blue-900 text-black hover:bg-blue-800'
                                        }`}
                                >
                                    <div className="grid grid-cols-2 gap-4 text-gray-300">
                                        <div>
                                            <span className="font-semibold text-white">Batch ID:</span><br />
                                            {batch.batchId || 'N/A'}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white">Batch Date:</span><br />
                                            {new Date(batch.date).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        ))
                    ) : (
                        <p className="text-gray-400 italic">No batch data available.</p>
                    )}
                </div>

            </div>
        </div>

    )
}

export default StockPastStockBatch