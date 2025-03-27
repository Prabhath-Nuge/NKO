import React from 'react'

function UsersRepresentativesComponent() {
  return (
    <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <h2 className="text-lg font-semibold">Representatives List</h2>
                    <p className="text-sm opacity-80">Manage all Representatives.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                {["Name", "Email", "Phone", "Status", "Actions"].map((header, index) => (
                                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold uppercase">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-900 font-medium">Mahinda Rajapaksha</td>
                                <td className="px-6 py-4 text-gray-600">mrajapaksha@gmail.com</td>
                                <td className="px-6 py-4 text-gray-600">0718273826</td>
                                <td className="px-6 py-4 text-gray-600">active</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <a href="#" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                                            <i className="fa-solid fa-pen-to-square"></i> Edit
                                        </a>
                                        <a href="#" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                                            <i className="fa-solid fa-arrows-rotate"></i> Change Status
                                        </a>
                                        <a href="#" className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                                            <i className="fa-solid fa-key"></i> Reset Password
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default UsersRepresentativesComponent