import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function UsersNewUsersComponent() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchUsers() {
            try {
                const response = await axios.get('/getnewusers', {withCredentials: true});

                if (response.data.error) {
                    toast.error(response.data.message);
                    return;
                }

                if (isMounted) {
                    setUsers(response.data.data);
                    console.log(response.data.data);
                }
            } catch (error) {
                toast.error("Failed to fetch users.");
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();

        return () => { isMounted = false };
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <h2 className="text-lg font-semibold">New Users</h2>
                    <p className="text-sm opacity-80">Manage all new users & grant them permissions.</p>
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
                            {users.map((user, index) => (
                                <tr key={user.id || index} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-900 font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.status}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button 
                                                aria-label="Edit User"
                                                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                                                onClick={() => console.log("Edit user:", user.id)}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i> Edit
                                            </button>

                                            <button 
                                                aria-label="Grant Permissions"
                                                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                                                onClick={() => console.log("Grant permissions to:", user.id)}
                                            >
                                                <i className="fa-solid fa-person-circle-plus"></i> Grant Permissions
                                            </button>

                                            <button 
                                                aria-label="Delete User"
                                                className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                                                onClick={() => console.log("Delete user:", user.id)}
                                            >
                                                <i className="fa-solid fa-trash"></i> Delete User
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsersNewUsersComponent;
