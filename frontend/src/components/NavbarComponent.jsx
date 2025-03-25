import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/2.png';

function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <ul className="bg-gradient-to-br from-gray-100 to-blue-500 shadow-md flex flex-col p-4 mt-4 border border-gray-200 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
            <li>
              <Link to="/" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black hover:scale-110 transition duration-300 ease-in-out">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black hover:scale-110 transition duration-300 ease-in-out">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black hover:scale-110 transition duration-300 ease-in-out">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black hover:scale-110 transition duration-300 ease-in-out">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
