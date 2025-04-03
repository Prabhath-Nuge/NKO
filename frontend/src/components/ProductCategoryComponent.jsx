import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductCategoryComponent() {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="flex items-center justify-center min-h-screen  p-8 rounded-lg mt-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Product Categories</h1>
          <p className="text-gray-600 mt-2">Explore all the product categories available in our system</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-6 text-sm font-semibold text-gray-700 border-b bg-gray-200">Name</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-700 border-b bg-gray-200">Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-100 transition duration-200 cursor-pointer">
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                    <Link to={`/category/${category._id}`} className="hover:text-blue-600 transition duration-200">
                      {category.name}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{category.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryComponent;