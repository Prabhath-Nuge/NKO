import { NavLink, Outlet } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'


function Products() {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-[20px]">
            <div data-aos="fade-up">
                <div   className="mb-8 text-center ">
                    <h1 className="text-3xl font-bold text-white">Product Management</h1>
                    <p className="text-gray-200 mt-2">Manage all products and their variants from this dashboard</p>
                </div>
                <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
                    <NavLink
                        to="category"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter">
                            Product Categories
                        </button>
                    </NavLink>

                    <NavLink
                        to="newcategory"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter">
                            Add New-Category
                        </button>
                    </NavLink>

                    <NavLink
                        to="addproduct"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                        }
                    >
                        <button id="newUsersFilter">
                            Add New-Product
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

export default Products