import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ProductVariant = () => {
  const { id } = useParams();
  const location = useLocation();
  const category = location.state?.category;
  const navigate = useNavigate();

  const [CategoryVariants, setCategoryVariants] = useState([]);

  useEffect(() => {
    axios.get(`/product/variants/${id}`)
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          setCategoryVariants(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <div className="w-67 lg:67 space-y-4 bg-gray-800 rounded-lg p-2 text-center">
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={category?.image}
              alt={category?.name}
              className="w-64 h-64 object-cover rounded-xl"
            />
          </div>
          <h2 className="text-4xl font-bold text-white">{category?.name}</h2>
          <p className="text-gray-300">{category?.description}</p>
        </div>

        <div className="w-full lg:w-1/2 space-y-4">
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg">
            <div>Weight (g)</div>
            <div>Sales Price</div>
            <div>Shop Price</div>
            <div>Packets Per Bundle</div>
            <div>Current inStock</div>
          </div>

          {CategoryVariants.length > 0 ? (
            CategoryVariants.map((variant) => (
              <div
                onClick={() => navigate(`/products/category/variants/edit`, { state: { variant } })}
                key={variant._id}
                className="grid grid-cols-5 gap-4 p-4 bg-gray-800 text-white rounded-md transition hover:bg-blue-900 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="font-medium">{variant.weight}</div>
                <div className="text-blue-300 font-semibold">Rs {variant.salesPrice} /=</div>
                <div className="text-gray-300">{variant.shopPrice} /=</div>
                <div className="text-gray-300">{variant.packetsPerBundle}</div>
                <div className="text-gray-300">{variant.currentStock}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic mt-2">No variants found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductVariant;
