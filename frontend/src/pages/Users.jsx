import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

function Users() {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-[20px]">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">User Management</h1>
                    

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <Link to="newusers">
                            <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                                <i className="fa-solid fa-user-shield scale-150"></i>
                                <span>New Users</span>
                            </button>
                        </Link>
                        <Link to="admins">
                            <button className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                                <i className="fa-solid fa-user-shield scale-150"></i>
                                <span>Admins</span>
                            </button>
                        </Link>

                        <Link to="managers">
                            <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                                <i className="fa-solid fa-user-tie scale-150"></i>
                                <span>Managers</span>
                            </button>
                        </Link>

                        <Link to="refs">
                            <button className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                                <i className="fa-solid fa-users scale-150"></i>
                                <span>Representatives</span>
                            </button>
                        </Link>

                    </div>
                </div>
                <div className="">
                    <Outlet />
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default Users