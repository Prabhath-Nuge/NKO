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
    <div className="space-y-6 px-6 py-8">
      {/* Category Name */}
      <h2 className="text-4xl font-bold text-white mb-4">{category?.name}</h2>

      {/* Variants */}
      {CategoryVariants.map((variant) => (
        <div
          key={variant._id}
          className="bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:drop-shadow-[0_10px_20px_rgba(26,60,150,0.2)]"
        >
          <div className="p-6">
            <p className="text-white text-xl leading-relaxed font-medium">
              <span className="font-bold">Weight:</span> {variant.weight}g &nbsp; | &nbsp;
              <span className="font-bold">Sales Price:</span> Rs {variant.salesPrice} &nbsp; | &nbsp;
              <span className="font-bold">Shop Price:</span> Rs {variant.shopPrice}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVariant;
