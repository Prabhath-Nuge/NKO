import logo from '../assets/images/2.png'

function NavbarComponent() {
  return (
    <nav id="navbar"
    class="bg-gradient-to-br from-blue-500 to-gray-100 p-4 shadow-md fixed top-0 w-full z-50 transition-all duration-300">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <a href="/index.html" class="flex items-center">
        <img src={logo} alt="My Brand Logo" class="h-[80px] w-auto transition-all duration-300"/>
      </a>
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="bg-gradient-to-br from-gray-100 to-blue-500 shadow-md flex flex-col p-4 mt-4 border border-gray-200 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black dark:hover:bg-gray-700 md:dark:hover:bg-transparent hover:scale-110 transition duration-300 ease-in-out transform">Home</a>
          </li>
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black dark:hover:bg-gray-700 md:dark:hover:bg-transparent hover:scale-110 transition duration-300 ease-in-out transform">About</a>
          </li>
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black dark:hover:bg-gray-700 md:dark:hover:bg-transparent hover:scale-110 transition duration-300 ease-in-out transform">Services</a>
          </li>
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-black dark:hover:text-black dark:hover:bg-gray-700 md:dark:hover:bg-transparent hover:scale-110 transition duration-300 ease-in-out transform">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default NavbarComponent