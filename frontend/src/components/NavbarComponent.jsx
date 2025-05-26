import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/1.png';
import { useAuth } from '../hooks/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      try {
        const isDone = await axios.get('/logout');

        if (!isDone.data.error) {
          setUser(null);
          navigate('/login');
        } else {
          toast.error(isDone.data.message);
        }
      } catch (error) {
        toast.error('Logout failed:', error.message);
      }
    } else {
      toast.error("User cancelled the logout.");
    }
  }

  return (
    <header className="w-full bg-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* <a href="#" className="text-3xl font-['Pacifico'] text-white">NKO</a> */}
        <img src={logo} alt="Logo" className="ml-20 h-15" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-300 hover:scale-110 ease-in font-medium transition"
                : "text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition"}>Dashboard</NavLink>
          <NavLink to="/products/category" className={({ isActive }) =>
              isActive
                ? "text-blue-300 hover:scale-110 ease-in font-medium transition"
                : "text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition"}>Products</NavLink>
          <NavLink to="/users/newusers" className={({ isActive }) =>
              isActive
                ? "text-blue-300 hover:scale-110 ease-in font-medium transition"
                : "text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition"}>Users</NavLink>
          <NavLink to='/stocks/allstocks' className={({ isActive }) =>
              isActive
                ? "text-blue-300 hover:scale-110 ease-in font-medium transition"
                : "text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition"}>Stocks</NavLink><h1 className='text-white'>Menaka</h1>
        </nav>

        <div className="flex items-center space-x-4">
          {/* User button with dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              className="bg-secondary text-white px-6 py-2 font-medium rounded-full whitespace-nowrap hover:!bg-blue-800 transition-colors flex items-center"
            >
              <i className="fa-regular fa-user mr-2"></i>
              {user ? user.email : ""}
              <i className={`ml-2 fa-solid fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
            </button>

            {showUserMenu && (
              <div data-aos="fade-in" className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden z-50 animate-fade-in">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

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
          <NavLink to="/dashboard" className="block py-2 font-medium hover:text-blue-400">Dashboard</NavLink>
          <NavLink to="/products/category" className="block py-2 font-medium hover:text-blue-400">Products</NavLink>
          <NavLink to="/users/newusers" className="block py-2 font-medium hover:text-blue-400">Users</NavLink>
          <NavLink to='/stocks/allstocks' className="block py-2 font-medium hover:text-blue-400">Stocks</NavLink>
          <button className="block w-full text-left py-2 font-medium hover:text-blue-400">
            <i className="fa-regular fa-user mr-2"></i>
            {user ? user.email : ""}
          </button>
          <button onClick={handleLogout} className='block w-full text-left py-2 font-medium hover:text-blue-400'>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default NavbarComponent;
