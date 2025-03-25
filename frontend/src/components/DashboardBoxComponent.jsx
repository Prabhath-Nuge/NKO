import React from 'react'

function DashboardBoxComponent({title, icon, description}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                <i className={`${icon} text-4xl text-gray-500`}></i>
            </div>
            <p className="mt-2 text-gray-600">{description}</p>
            <a href="#"
                className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Manage {title}</a>
        </div>
    )
}

export default DashboardBoxComponent