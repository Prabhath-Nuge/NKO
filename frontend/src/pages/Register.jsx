import React, { useState } from 'react'
import image from '../assets/images/login.jpg'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [logDets, setLogDets] = useState({ name: '', email: '', phone: '', address: '', dob: '', password: '' });
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleChange = (e) => {
        setLogDets({ ...logDets, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone, address, dob, password } = logDets;

        if (!name || !email || !phone || !address || !dob || !password) {
            return toast.error('Please fill in all fields');
        }

        if(name.length < 4){
            return toast.error('Name must be at least 4 characters');
        }

        if (!/^\d{10}$/.test(phone)) {
            return toast.error('Phone number must be exactly 10 digits');
        }        

        if(phone.length < 10){
            return toast.error('Phone number must be at least 10 characters');
        }

        if(password.length < 6){
            return toast.error('Password must be at least 6 characters');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return toast.error('Enter a valid email address');
        }
        

        setLoading(true);
        axios.post('/register', logDets)
            .then(res => {
                if(res.data.error){
                    return toast.error(res.data.message);
                }
                toast.success(res.data.message);
                setLoading(false);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                toast.error('An error occurred. Please try again later: ' + err.message);
            });

    }

    return (

        <div className="bg-gray-900">
            <div className="min-h-screen flex">
                <div className="w-full flex items-center justify-center p-8">
                    <div className="w-full max-w-xl">
                        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-400 rounded-full mb-4">
                                    <i className="fas fa-user-plus text-blue-800 fa-lg"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-100">Create Account</h2>
                                <p className="text-gray-200 mt-2">Get started with your account</p>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-100 mb-2">Name</label>
                                    <div className="relative">
                                        <input type="text" name="name" required
                                            className="w-full px-4 py-3 rounded-lg border text-white border-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="Name in Full (min 4 characters)"
                                            onChange={handleChange} />
                                        <i className="fa-solid fa-font absolute right-2 top-4 w-6 h-6 text-gray-400"></i>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-100 mb-2">Email Address</label>
                                    <div className="relative">
                                        <input type="email" name="email" required
                                            className="w-full px-4 py-3 rounded-lg border text-white border-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="you@example.com"
                                            onChange={handleChange} />
                                        <i className="fas fa-envelope absolute right-2 top-4 w-6 h-6 text-gray-400"></i>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-100 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <input type="tel" name="phone" required
                                            className="w-full px-4 py-3 rounded-lg border text-white border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="07x xxxx xxx (10 Digit)"
                                            pattern="[0-9]{10}"
                                            onChange={handleChange} />
                                        <i className="fa-solid fa-phone absolute right-2 top-4 w-6 h-6 text-gray-400"></i>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-100 mb-2">Address</label>
                                    <div className="relative">
                                        <textarea name="address" required
                                            className="w-full px-4 py-3 rounded-lg border text-white border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="Your Address"
                                            onChange={handleChange} />
                                        <i className="fa-solid fa-location-dot absolute right-2 top-4 w-6 h-6 text-gray-400"></i>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-100 mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <input type="date" name="dob" required
                                            className="w-full px-4 py-3 rounded-lg border text-white border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="07x xxxx xxx"
                                            onChange={handleChange} />
                                        {/* <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                            <i className="fas fa-eye"></i>
                                        </button> */}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-100 mb-2">Password</label>
                                    <div className="relative">
                                        <input type={toggle ? "text" : "password"} name="password" required
                                            className="w-full px-4 py-3 rounded-lg border text-white border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                                            placeholder="•••••••• (min 6 characters)"
                                            onChange={handleChange} />
                                        <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setToggle(!toggle)}>
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors focus:ring-4 focus:ring-opacity-50 ${loading
                                        ? "bg-gray-400 text-gray-200 cursor-not-allowed focus:ring-gray-400"
                                        : "bg-blue-600 text-white focus:ring-blue-600 hover:bg-blue-700"
                                     }`}
                                     
                                >
                                    {loading ? "Registering..." : "Sign In"}
                                </button>


                                <p className="mt-6 text-center text-gray-100">
                                    Allready have an account?
                                    <Link to='/login' className="ml-1 text-blue-600 hover:text-blue-700 font-semibold focus:outline-none">
                                        Click here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

    )
}


export default Register