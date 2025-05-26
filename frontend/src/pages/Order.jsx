import { NavLink, Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';

function Orders() {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-[20px]">
                <div data-aos="fade-up">
                    <div className="mb-4 text-center">
                        <h1 className="text-3xl font-bold text-white">Order Management</h1>
                        <p className="text-gray-200 mt-2">Track, review, and manage all customer orders from this dashboard</p>
                    </div>
                    
                </div>

                <div>
                    <Outlet />
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}

export default Orders;
