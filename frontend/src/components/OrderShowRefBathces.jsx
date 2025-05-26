import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const OrderShowRefBathces = () => {
    const location = useLocation();
    const ref = location.state?.ref;

    const [orderBatches, setOrderBatches] = useState([]);

    useEffect(() => {
        axios.get(`/order/batches/${ref?._id}`)
            .then(res => {
                setOrderBatches(res.data.data || []);
            })
            .catch(err => {
                console.error('Failed to fetch order batches:', err);
            });
    }, [ref]);

    return (
        <div className="px-6 py-10 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-2">

                <div className="rounded-2xl p-2 text-center">
                    <h2 className="text-2xl font-bold text-white">Order Batches</h2>
                    <p className="text-xl text-blue-400">{ref?.name}</p>
                    <p className="text-gray-400">{ref?.email}</p>
                </div>

                <hr className="border-gray-300 mb-4" />

                {orderBatches.length === 0 ? (
                    <p className="text-gray-400 text-center">No order batches found.</p>
                ) : (
                    orderBatches.map((batch, index) => (
                        <Link to='orderlist' state={{ batch }}>
                            <div
                                key={index}
                                className="bg-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg hover:bg-blue-900 transition text-center mb-4"
                            >
                                <h3 className="text-xl font-semibold text-white mb-1">
                                    <i className="fa-solid fa-layer-group mr-3"></i>
                                    Batch: {batch.batchNumber}
                                </h3>
                                <p className="text-gray-300">Date: {new Date(batch.date).toLocaleDateString()}</p>
                            </div>
                        </Link>

                    ))
                )}
            </div>
        </div>
    );
};

export default OrderShowRefBathces;
