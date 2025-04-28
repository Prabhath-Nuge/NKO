import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

function Users() {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-[20px]">
                <div data-aos="fade-up">
                <div   className="mb-8 text-center ">
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                    <p className="text-gray-200 mt-2">Manage all users and their permissions from this dashboard</p>
                </div>
                <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
                    <NavLink
                        to="newusers"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter">
                            New Users
                        </button>
                    </NavLink>

                    <NavLink
                        to="admins"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter">
                            Admins
                        </button>
                    </NavLink>

                    <NavLink
                        to="managers"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter">
                            Managers
                        </button>
                    </NavLink>

                    <NavLink
                        to="refs"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter">
                            Representatives
                        </button>
                    </NavLink>
                </div>
                </div>

                <Outlet />

            </div>
            <FooterComponent />
        </div>
    )
}

export default Users