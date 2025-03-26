import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/2.png';

function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-blue-500 to-gray-100 p-4 shadow-md fixed top-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="My Brand Logo" className="h-[80px] w-auto transition-all duration-300" />
        </Link>

        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="hover:scale-110 transition duration-300 ease-in-out bg-gradient-to-br from-gray-100 to-blue-500 shadow-md flex flex-col p-4 mt-4 border border-gray-200 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
            <li>
              <Link to="/" className="hover:scale-110 transition duration-300 ease-in-out block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:scale-110 transition duration-300 ease-in-out block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:scale-110 transition duration-300 ease-in-out block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:scale-110 transition duration-300 ease-in-out block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="hover:scale-110 transition duration-300 ease-in-out flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none"
            >
              <div className="text-gray-700 text-lg fa-solid fa-user" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                <Link to="/edit-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Edit Profile
                </Link>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>

          <span className="text-black font-medium hidden md:block">user@example.com</span>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
