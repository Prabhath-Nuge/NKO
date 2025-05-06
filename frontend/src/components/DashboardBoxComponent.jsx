import React from 'react';
import { Link } from 'react-router-dom';

function DashboardBoxComponent({ title, icon, description, link }) {
    return (
        <Link to={link}>
            <div
                className="border-2 border-gray-700 bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl hover:drop-shadow-[0_10px_20px_rgba(26,60,150,0.3)] p-4 m-2 transition-transform transform hover:scale-105 duration-300 ease-in-out group"
                data-aos="fade-up"
                data-aos-once="true"
            >
                <div className="w-16 h-16 mb-4 rounded-full bg-blue-200 flex items-center justify-center shadow-inner">
                    <i className={`${icon} text-2xl text-blue-800`}></i>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{title}</h3>

                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>

                <div className="inline-block mt-auto bg-secondary text-white hover:bg-blue-800 font-semibold py-2 px-5 rounded-lg transition-colors">
                    Manage {title}
                </div>
            </div>
        </Link>
    );
}

export default DashboardBoxComponent;
