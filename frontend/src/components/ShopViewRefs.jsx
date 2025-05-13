import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ShopViewRefs = () => {
  const [refs, setRefs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/getrefs') // Adjust this to match your backend route
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          setRefs(response.data.data);
        }
      })
      .catch((error) => {
        toast.error('Failed to fetch managers.');
        console.error(error);
      });
  }, []);

  const handleRowClick = (ref) => {
    navigate(`viewrefsshops`, { state: { ref } });
  };

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg text-center">
            <div>Representative Name</div>
            <div>Email</div>
          </div>

          {refs.length > 0 ? (
            refs.map((ref) => (
              <div
                key={ref._id}
                onClick={() => handleRowClick(ref)}
                className="grid grid-cols-2 gap-4 p-4 bg-gray-800 text-white rounded-md text-center mt-2 transition hover:bg-blue-900 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="font-medium">{ref.name}</div>
                <div className="text-gray-300">{ref.email}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic mt-4 text-center">No Representatives found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopViewRefs;
