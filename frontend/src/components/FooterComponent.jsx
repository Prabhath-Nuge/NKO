import React from 'react'

function FooterComponent() {
  return (
    <footer className="bg-primary text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm">
            We bring the finest, hand-selected spices from around the world to your kitchen — rich in flavor, aroma, and tradition
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm">Email: nkoproducts@gmail.com</p>
            <p className="text-sm">Phone:  077 30 424 74</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-sm">Club Road</p>
            <p className="text-sm">Pelmadulla, Rathnapura, Sabaragamuwa.</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} NKO Products. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent
