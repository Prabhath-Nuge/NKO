import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function UsersRepresentativesComponent() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        async function fetchUsers() {
            try {
                const response = await axios.get('/getrefs', {withCredentials: true});

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
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <h2 className="text-lg font-semibold">Representatives List</h2>
                    <p className="text-sm opacity-80">Manage all Representatives.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                {["Name", "Email", "Phone"].map((header, index) => (
                                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold uppercase">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user,index)=>(
                            <tr key={index} className="hover:bg-gray-100 hover:cursor-pointer transition" onClick={() => navigate(`/users/user/${user._id}`, { state: { user } })}>
                                <td className="px-6 py-4 text-gray-900 font-medium">{user.name}</td>
                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                                
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default UsersRepresentativesComponent