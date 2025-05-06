import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

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
    if (categories.length > 0) {
      AOS.refresh();
    }
  }, [categories]);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4">
        <div data-aos="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Product Categories</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Manage categories and view product variants.
          </p>
        </div>

        <div data-aos="fade-up" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:drop-shadow-[0_10px_20px_rgba(26,60,150,0.2)]"
            >
              <div className="h-64 p-2 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center rounded-t-xl"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{category.description}</p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/products/category/${category._id}`, { state: { category } })}
                    className="hidden md:inline-block bg-secondary hover:bg-blue-800 text-white px-4 py-2 text-sm font-medium rounded-md transition"
                  >
                    Edit Category
                  </button>

                  <button
                    className="hidden md:inline-block bg-secondary hover:bg-blue-800 text-white px-4 py-2 text-sm font-medium rounded-md transition"
                  >
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
