import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import { NavLink, Outlet } from 'react-router-dom'
import FooterComponent from '../components/FooterComponent'

const Shop = () => {
  return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-[20px]">
            <div data-aos="fade-up">
                <div   className="mb-8 text-center ">
                    <h1 className="text-3xl font-bold text-white">Registered Shops</h1>
                    <p className="text-gray-200 mt-2">Manage and Review Shops details, Due Amounts from here</p>
                </div>
                <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
                    <NavLink
                        to="/shops/viewrefs"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter " className='hover:cursor-pointer'>
                            Managers Shops
                        </button>
                    </NavLink>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter " className='hover:cursor-pointer'>
                            All Shops
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

export default Shop