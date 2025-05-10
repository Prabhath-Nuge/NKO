import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const StockAllStockComponent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/allstocks');
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          setProducts(response.data.data);  // Assuming 'data' contains the grouped products
        }
      } catch (error) {
        toast.error('Error fetching products.');
        console.error(error);
      }
    };

    fetchProducts();
  }, []); // Run on component mount

  return (
    <section id="products" className="py-4">
      <div className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></div>
      <div className="container mx-auto px-4">
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Current Stocks</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Manage all Current Stocks and view Stock amount.
          </p>
        </div>

        <div data-aos="fade-up" className="space-y-8">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product, index) => (
              <div key={index} className="w-full max-w-6xl mx-auto space-y-6">
                {/* Flex Container for Category and Variants */}
                <div className="flex  items-center justify-center  space-x-8 bg-gray-700 p-4 rounded-lg">
                  {/* Category Info on the Left */}
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-white">{product.categoryName}</h3>
                    <img
                      src={product.categoryImage}
                      alt={product.categoryName}
                      className="w-48 h-48 object-cover mt-2 rounded-md"
                    />
                  </div>

                  {/* Variants Grid on the Right */}
                  <div className="flex-2 w-full">
                    {/* Variants Header */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-700 text-white font-bold rounded-lg">
                      <div className="col-span-1 text-center">Weight (g)</div>
                      <div className="col-span-1 text-center">Current inStock</div>
                    </div>

                    {/* Display Variants */}
                    {product.variants.length > 0 ? (
                      product.variants.map((variant,index) => (
                        <div
                          key={index}
                          // onClick={() =>
                          //   navigate(`/products/category/variants/edit`, { state: { variant } })
                          // }
                          className="grid grid-cols-2 gap-4 p-4 mb-2 bg-gray-800 text-white rounded-md transition hover:bg-blue-900 hover:cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="font-medium text-center">{variant.weight}</div>
                          <div className="text-gray-300 text-center">{variant.currentStock}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic mt-2">No variants found for this category.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default StockAllStockComponent;
