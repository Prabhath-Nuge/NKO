import React, { useState } from 'react'
import image from '../assets/images/login.jpg'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [logDets, setLogDets] = useState({ email: 'admin@gmail.com', password: 'admin123' });
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();


    const handleChange = (e) => {
        setLogDets({ ...logDets, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = logDets;

        if (!email || !password) {
            return toast.error('All fields are required');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return toast.error('Enter a valid email address');
        }

        if (password.length < 6) {
            return toast.error('Password must be at least 6 characters');
        }

        try {
            const res = await axios.post('http://localhost:5000/login', logDets);
            if (res.data.error) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                navigate('/dashboard');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    toast.error('Invalid email or password. Please try again.');
                } else {
                    toast.error('An error occurred. Please try again: ' + err.response.data.message);
                }
            } else {
                toast.error('Network error or request failed. Please try again.');
            }
        }
    }

    return (

        <div className="bg-gray-200">
            <div className="min-h-screen flex">
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                    <i className="fas fa-sign-in-alt text-blue-600 fa-lg"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                                <p className="text-gray-600 mt-2">Please sign in to continue</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <input type="email" name="email" required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="you@example.com"
                                            onChange={handleChange} />
                                        <i className="fas fa-envelope absolute right-2 top-4 w-6 h-6 text-gray-400"></i>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <input type={toggle ? "text" : "password"} name="password" required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="••••••••"
                                            onChange={handleChange} />
                                        <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setToggle(!toggle)}>
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition-colors">
                                    Sign In
                                </button>
                                <p className="mt-6 text-center text-gray-600">
                                    Need an account?
                                    <Link to='/register' className="ml-1 text-blue-600 hover:text-blue-700 font-semibold focus:outline-none">
                                        Click here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                    <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white px-12">
                            <h2 className="text-4xl font-bold mb-6">NKO Products</h2>
                            <p className="text-xl">Your spice business starts here. Log in to manage your account and discover new opportunities</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Login