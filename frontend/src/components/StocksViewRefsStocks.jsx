import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const StocksViewRefsStocks = () => {
  
  const location = useLocation();
  const ref = location.state?.ref;


  return (
  <div className="px-6 py-10 bg-gray-900 min-h-screen">
    <div className="max-w-3xl mx-auto space-y-8">
      
      <div className="bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Representative</h2>
        <p className="text-xl text-blue-400">{ref?.name}</p>
        <p className="text-gray-400">{ref?.email}</p>
      </div>

      <Link to={`current/${ref._id}`} state={{ref}} className="hover:bg-blue-900 transition ">
      <div className="bg-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg hover:bg-blue-900 transition text-center mb-4">
        <h2 className="text-2xl font-semibold text-white mb-1">
            <i className="fa-solid fa-box-open mr-4"></i>
             Current Stock</h2>
        <p className="text-gray-300">View current Stock amounts.</p>
      </div>
      </Link>

      <Link to="" className="hover:bg-blue-900 transition ">
      <div className="bg-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg hover:bg-blue-900 transition text-center mb-4">
        <h2 className="text-2xl font-semibold text-white mb-1">
            <i className="fa-solid fa-chart-line mr-4"></i>
             Past Stock History</h2>
        <p className="text-gray-300">Review historical data and stock changes over time.</p>
      </div>
      </Link>
    </div>
  </div>
);

}

export default StocksViewRefsStocks