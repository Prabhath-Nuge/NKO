import React from 'react'
import { Link } from 'react-router-dom'

function DashboardBoxComponent({ title, icon, description, link }) {
    return (
        <Link to={link} >
            <div  className="bg-gray-100 hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] rounded-lg shadow-md p-6 m-3  transition-transform transform hover:scale-105 duration-300 ease-in-out " data-aos='fade-up' data-aos-once="true">

                <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className={`${icon} text-2xl text-blue-800`}></i>
                </div>


                <p className="mt-2 text-gray-600 text-lg">{description}</p>
                <div
                    className="mt-2 inline-block bg-secondary hover:!bg-blue-800 text-white font-bold py-2 px-4 rounded">Manage {title}</div>
            </div>
        </Link>
    )
}

export default DashboardBoxComponent