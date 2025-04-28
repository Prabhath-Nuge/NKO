import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/2.png';

function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-3xl font-['Pacifico'] text-white">NKO</a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to='/' className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">Home</Link>
          <Link to="/products/category" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">Products</Link>
          <Link to="/dashboard" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">Dashboard</Link>
          {/* <Link to="#about" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">About</Link>
          <Link to="#contact" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">Contact</Link> */}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center text-gray-100 hover:text-blue-500 hover:scale-110 ease-in cursor-pointer transition-colors">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <div className="w-10 h-10 flex items-center justify-center text-gray-100 hover:text-blue-500 hover:scale-110 ease-in cursor-pointer relative transition-colors">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
          </div>

          <Link to="/login">
            <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
              Login / Register
            </button>
          </Link>

          {/* Hamburger Icon */}
          <div
            className="md:hidden w-10 h-10 flex items-center justify-center text-white  cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>

          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-primary text-white px-4 pb-4">
          <a href="#" className="block py-2 font-medium hover:text-blue-400">Home</a>
          <a href="#products" className="block py-2 font-medium hover:text-blue-400">Products</a>
          <a href="#about" className="block py-2 font-medium hover:text-blue-400">About</a>
          <a href="#contact" className="block py-2 font-medium hover:text-blue-400">Contact</a>
          <button className="w-full bg-secondary text-white py-2 mt-3 rounded-md hover:!bg-blue-800 transition-colors">
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export default NavbarComponent;
