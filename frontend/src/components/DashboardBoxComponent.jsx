import React from 'react'
import { Link } from 'react-router-dom'

function DashboardBoxComponent({title, icon, description, link}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                <i className={`${icon} text-4xl text-gray-500`}></i>
            </div>
            <p className="mt-2 text-gray-600">{description}</p>
            <Link to={link}
                className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Manage {title}</Link>
        </div>
    )
}

export default DashboardBoxComponent