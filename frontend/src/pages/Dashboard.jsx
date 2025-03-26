import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import DashboardBoxComponent from '../components/DashboardBoxComponent'
import FooterComponent from '../components/FooterComponent'

function Dashboard() {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-[150px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DashboardBoxComponent title="Users" icon="fa-solid fa-users" description={"Details of representatives and managers"} />
                    <DashboardBoxComponent title="Products" icon="fa-solid fa-box-open" description={"Detailed information about available products."}/>
                    <DashboardBoxComponent title="Stocks" icon="fa-solid fa-scroll" description={"Monitor stock availability"} />
                    <DashboardBoxComponent title="Salary" icon="fa-solid fa-money-bill-1-wave" description={"Manage employee salaries"}/>
                    <DashboardBoxComponent title="Orders" icon="fa-solid fa-clipboard-list" description={"Track all order details" }/>
                    <DashboardBoxComponent title="Shops" icon="fa-solid fa-store" description={"Shop Details and Due amounts" }/>
                    <DashboardBoxComponent title="Analysis" icon="fa-solid fa-chart-line" description={"Analyze company revenue, expenses, and overall financial health." }/>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
export default Dashboard