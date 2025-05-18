import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'
import { NavLink, Outlet } from 'react-router-dom'

const Stocks = () => {
  return (
    <div>
        <NavbarComponent />
        <div className="container mx-auto p-4 mt-[20px]">
            <div data-aos="fade-up">
                <div   className="mb-8 text-center ">
                    <h1 className="text-3xl font-bold text-white">Stock Management</h1>
                    <p className="text-gray-200 mt-2">Manage all Products Stocks from this dashboard</p>
                </div>
                <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
                    <NavLink
                        to="viewrefs"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter" className='cursor-pointer'>
                            Representatives Stocks
                        </button>
                    </NavLink>
                    
                    <NavLink
                        to="allstocks"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter " className='cursor-pointer'>
                            Current Company Stocks
                        </button>
                    </NavLink>

                    <NavLink
                        to="history"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter" className='cursor-pointer'>
                            Company Stock History
                        </button>
                    </NavLink>

                </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
            <FooterComponent />
    </div>
  )
}

export default Stocks