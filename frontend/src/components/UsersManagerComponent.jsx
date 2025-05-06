import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UsersManagerComponent() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        async function fetchUsers() {
            try {
                const response = await axios.get('/getmanagers', { withCredentials: true });

                if (response.data.error) {
                    toast.error(response.data.message);
                    return;
                }

                if (isMounted) {
                    setUsers(response.data.data);
                }
            } catch (error) {
                toast.error("Failed to fetch users.");
            }
        }

        fetchUsers();

        return () => { isMounted = false };
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-gray-900 shadow-lg rounded-xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
                    <h2 className="text-lg font-semibold">Managers List</h2>
                    <p className="text-sm text-gray-300">Manage all Managers.</p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-800 text-gray-300">
                            <tr>
                                {["Name", "Email", "Phone"].map((header, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {users.map((user, index) => (
                                <tr
                                    key={user._id || index}
                                    onClick={() => navigate(`/users/user/${user._id}`, { state: { user } })}
                                    className="hover:bg-gray-800 transition cursor-pointer"
                                >
                                    <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-300">{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsersManagerComponent;
