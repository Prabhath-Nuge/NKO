import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const NewUserDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: id,
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        type: user?.type || "user", // default value
        dob: user?.dob ? user.dob.slice(0, 10) : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/updateuser',formData)
        .then((response) => {
            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }
            toast.success("User updated successfully!");
            navigate(-1, { replace: true });
        })
        .catch((error) => {
            toast.error("Error updating user:", error);
        });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          axios.delete(`/deleteuser/${id}`)
            .then((response) => {
              if (response.data.error) {
                toast.error(response.data.message);
                return;
              }
              toast.success("User deleted successfully!");
              navigate("/users", { replace: true });
            })
            .catch((error) => {
              toast.error("Error deleting user:", error.message);
            });
        }
      };
      

    return (
        <div data-aos='fade-up'>
            <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6"
        >
            <h1 className="text-3xl font-bold text-gray-900">Edit User Details</h1>
            <input
                        type="text"
                        name="id"
                        value={id}
                        onChange={handleChange}
                        hidden
                    />

            <div className="space-y-4">

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter name"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter phone number"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter address"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="ref">Representative</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition"
            >
                Save Changes
            </button>
            <button
                type="button"
                onClick={handleDelete}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
            >
                Delete User!
            </button>
        </form>
        </div>
    );
}

export default NewUserDetailPage