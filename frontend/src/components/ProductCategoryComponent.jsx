import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';

function ProductCategoryComponent() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/product/category')
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.message);
        } else {
          setCategories(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    // Refresh AOS after the data has been loaded
    if (categories.length > 0) {
      AOS.refresh();
    }
  }, [categories]);

  return (
      <section id="products" className="">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Product Categories Section</h2>
            <p className="text-gray-100 max-w-2xl mx-auto">Manage Categories and get product variants</p>
          </div>
          <div data-aos="fade-up" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] hover:-translate-y-2">
                <div className="h-64 overflow-hidden shadow-lg">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="items-center flex justify-between mb-4">

                    <button onClick={() => navigate(`/products/category/${category._id}`, { state: { category } })} className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                      Edit Category
                    </button>
                    <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                      View Variants
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  );
}

export default ProductCategoryComponent;