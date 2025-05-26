import { NavLink, Outlet } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

function Salary() {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-[20px]">
                <div data-aos="fade-up">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-white">Salary Management</h1>
                        <p className="text-gray-200 mt-2">Manage employee salaries and compensation details from this dashboard</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
                        <NavLink
                            to="viewcurrentsalary"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                    : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                            }
                        >
                            <button id="salaryListButton">
                                Increment-Decrement Salary
                            </button>
                        </NavLink>

                        <NavLink
                            to="salaryhistoryviewrefs"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-blue-500 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                                    : "bg-blue-800 text-white px-6 py-3 rounded whitespace-nowrap hover:bg-blue-500 transition-all font-medium cursor-pointer"
                            }
                        >
                            <button id="addSalaryButton">
                                Salary History
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

export default Salary
