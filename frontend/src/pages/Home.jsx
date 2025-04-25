import React, { useState } from 'react'
import FooterComponent from '../components/FooterComponent'
import { Link } from 'react-router-dom';

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <header className="w-full bg-primary shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <a href="#" className="text-3xl font-['Pacifico'] text-white">NKO</a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">Home</a>
                        <a href="#products" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">Products</a>
                        <a href="#about" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">About</a>
                        <a href="#contact" className="text-gray-100 hover:text-blue-500 hover:scale-110 ease-in font-medium transition">Contact</a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 flex items-center justify-center text-gray-100 hover:text-blue-500 hover:scale-110 ease-in cursor-pointer transition-colors">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>

                        <div className="w-10 h-10 flex items-center justify-center text-gray-100 hover:text-blue-500 hover:scale-110 ease-in cursor-pointer relative transition-colors">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                        </div>

                        <Link to="/login">
                            <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                Login / Register
                            </button>
                        </Link>

                        {/* Hamburger Icon */}
                        <div
                            className="md:hidden w-10 h-10 flex items-center justify-center text-white  cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>

                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {menuOpen && (
                    <div className="md:hidden bg-primary text-white px-4 pb-4">
                        <a href="#" className="block py-2 font-medium hover:text-blue-400">Home</a>
                        <a href="#products" className="block py-2 font-medium hover:text-blue-400">Products</a>
                        <a href="#about" className="block py-2 font-medium hover:text-blue-400">About</a>
                        <a href="#contact" className="block py-2 font-medium hover:text-blue-400">Contact</a>
                        <button className="w-full bg-secondary text-white py-2 mt-3 rounded-md hover:!bg-blue-800 transition-colors">
                            Sign In
                        </button>
                    </div>
                )}
            </header>


            <section
                data-aos="fade-up"
                className="relative"
                style={{
                    backgroundImage:
                        "url('https://wallpapercat.com/w/full/8/d/0/585963-1920x1281-desktop-hd-spices-background.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                <div className="container mx-auto px-4 py-32 md:py-40 relative z-10">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">Discover the Finest Spices from Around the World</h1>
                        <p className="text-lg md:text-xl text-white mb-8">Elevate your culinary creations with our premium, ethically sourced spices that bring authentic flavors to your kitchen.</p>
                        <div className="flex flex-wrap gap-4">
                            <button className="hidden md:block bg-secondary text-white px-8 py-6 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                Shop Now
                            </button>
                            <button className="hidden md:block bg-white text-blue-900 px-8 py-6 font-medium rounded-md whitespace-nowrap hover:!bg-gray-300 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="products" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div data-aos="fade-down" className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Premium Collection</h2>
                        <p className="text-gray-100 max-w-2xl mx-auto">Handpicked and carefully sourced from the finest growing regions around the world to ensure exceptional quality and flavor.</p>
                    </div>

                    <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] hover:-translate-y-2">
                            <div className="h-64 overflow-hidden shadow-lg">
                                <img src="https://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/8/1/81vK7Ch1iAL._SL1500_.jpg" alt="Saffron" className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Premium Saffron</h3>
                                    <span className="text-primary font-bold">$24.99</span>
                                </div>
                                <p className="text-gray-600 mb-4">Hand-harvested premium saffron threads from the valleys of Kashmir, known for their exceptional aroma and color.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">(128)</span>
                                    </div>
                                    <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] hover:-translate-y-2">
                            <div className="h-64 overflow-hidden shadow-lg">
                                <img src="https://tiimg.tistatic.com/fp/1/007/591/wholesale-price-export-quality-9mm-green-color-organic-cardamom-for-spices-821.jpg" alt="Cardamom" className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Organic Cardamom</h3>
                                    <span className="text-primary font-bold">$18.50</span>
                                </div>
                                <p className="text-gray-600 mb-4">Aromatic green cardamom pods from the highlands of Guatemala, perfect for both sweet and savory dishes.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">(95)</span>
                                    </div>
                                    <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] hover:-translate-y-2">
                            <div className="h-64 overflow-hidden shadow-lg">
                                <img src="https://hillstreetgrocer.com/application/files/2916/0184/8768/Sweet_smoked_or_hot_..._its_time_to_learn_about_paprika.jpg" alt="Smoked Paprika" className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Smoked Paprika</h3>
                                    <span className="text-primary font-bold">$12.99</span>
                                </div>
                                <p className="text-gray-600 mb-4">Authentic Spanish smoked paprika with a rich, complex flavor profile and vibrant color for your dishes.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">(76)</span>
                                    </div>
                                    <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] hover:-translate-y-2">
                            <div className="h-64 overflow-hidden shadow-lg">
                                <img src="https://m.media-amazon.com/images/I/81-kgpdUAdL._SL1500_.jpg" alt="Vanilla Beans" className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Madagascar Vanilla Beans</h3>
                                    <span className="text-primary font-bold">$29.99</span>
                                </div>
                                <p className="text-gray-600 mb-4">Premium grade A Madagascar vanilla beans with an exceptional aroma and flavor for your baking needs.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">(142)</span>
                                    </div>
                                    <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] hover:-translate-y-2">
                            <div className="h-64 overflow-hidden shadow-lg">
                                <img src="https://www.myspicer.com/wp-content/uploads/tellicherry.jpg" alt="Black Peppercorns" className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Tellicherry Peppercorns</h3>
                                    <span className="text-primary font-bold">$14.50</span>
                                </div>
                                <p className="text-gray-600 mb-4">Premium Tellicherry black peppercorns from India's Malabar coast, known for their complex, citrusy flavor.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">(89)</span>
                                    </div>
                                    <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform hover:drop-shadow-[0_10px_20px_rgba(103,105,255,0.4)] hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                            <div className="h-64 overflow-hidden shadow-lg">
                                <img src="https://nourished.com/wp-content/uploads/2021/10/cinnamon-ceylon.jpg" alt="Cinnamon" className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">Ceylon Cinnamon</h3>
                                    <span className="text-primary font-bold">$16.99</span>
                                </div>
                                <p className="text-gray-600 mb-4">True Ceylon cinnamon from Sri Lanka with a delicate, sweet flavor profile that's distinctly different from cassia.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                            <i class="fa-solid fa-star text-yellow-400"></i>
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">(112)</span>
                                    </div>
                                    <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <a href="#" className="inline-flex items-center text-white font-medium hover:underline">
                            View All Products -{">"}
                            <i className="ri-arrow-right-line ml-2"></i>
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div data-aos="fade-right" className="w-full md:w-1/2">
                            <img src="https://img.freepik.com/free-photo/young-woman-working-office-with-laptop-headphones-white-wall-customer-service-call-center_231208-8602.jpg?t=st=1745555609~exp=1745559209~hmac=85a22853622459c1bf95051dce5add805128e5f5329e49a20306a7495dd5c6fb&w=996" alt="Customer Service" className="w-full h-auto rounded-lg shadow-lg" />
                        </div>

                        <div data-aos="fade-left" className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Premium Customer Service</h2>
                            <p className="text-gray-100 mb-8">We believe exceptional products deserve exceptional service. Our dedicated team of spice experts is here to assist you every step of the way.</p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-700 text-gray-100 rounded-full mr-4 flex-shrink-0">
                                        <i class="fa-solid fa-headset"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-100 mb-2">24/7 Expert Support</h3>
                                        <p className="text-gray-100">Our knowledgeable team is available around the clock to answer your questions about our products and provide culinary advice.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-700 text-gray-100 rounded-full mr-4 flex-shrink-0">
                                        <i class="fa-solid fa-truck"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-100 mb-2">Fast & Free Shipping</h3>
                                        <p className="text-gray-100">Enjoy complimentary shipping on all orders over $50, with most deliveries arriving within 2-3 business days.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-700 text-gray-100 rounded-full mr-4 flex-shrink-0">
                                        <i class="fa-solid fa-arrows-spin"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-100 mb-2">Satisfaction Guarantee</h3>
                                        <p className="text-gray-100">Not completely satisfied? We offer a 30-day money-back guarantee on all our products, no questions asked.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <a href="#" className="flex items-center text-white font-medium">
                                    <i class="fa-solid fa-phone-volume mr-3"></i>  +94 77 30 424 74
                                </a>
                                <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                    Live Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div data-aos="fade-left" className="w-full md:w-2/5">
                            <img src="https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/453385412_3009511312523147_4578037588129002144_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=aa7094&_nc_eui2=AeE_QKKzR61TzJh-IxkAFejHzLnGFmbEyWHMucYWZsTJYSUDPFRRN53zFIe_ju4155_kYlwBVPfI5uZyFm7sNlRN&_nc_ohc=1Ll9eWxIYkEQ7kNvwGMpT5p&_nc_oc=AdlRN1KdJyg0r4fFBnXxS-lBkhzZr5H0ZXSM3Rb1Exyw5IZRkKIn_jCAurgxmWrDGpo&_nc_zt=23&_nc_ht=scontent.fcmb1-2.fna&_nc_gid=7-tX2x6zppBHclq_dBh20Q&oh=00_AfF2r3dXKe_8oz4FwM2bQCSr2BMTZFtp6sTGP8NxF6AthA&oe=6810D010" alt="CEO Portrait" className="w-full h-auto rounded-lg shadow-lg" />
                        </div>

                        <div data-aos="fade-right" className="w-full md:w-3/5">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Founder</h2>
                            <h3 className="text-xl text-white font-medium mb-6">Dr. Gemba Richardson, Founder & CEO</h3>

                            <p className="text-white mb-4">With over 20 years of experience in culinary arts and a Ph.D. in Food Science, Dr. Richardson has dedicated his career to sourcing the world's finest spices while ensuring sustainable and ethical practices.</p>

                            <p className="text-white mb-4">His journey began in 2005 after traveling through the spice markets of India, Morocco, and Indonesia, where she discovered the vast difference between freshly harvested, properly handled spices and the mass-produced varieties commonly found in supermarkets.</p>

                            <p className="text-white mb-6">Today, He leads our company with a commitment to quality, sustainability, and culinary education, personally overseeing our relationships with small-scale farmers across 14 countries.</p>

                            <div className="p-6 bg-gray-500 rounded-lg border border-secondary shadow-sm mb-6">
                                <p className="text-gray-100 italic">"Our mission is simple: to connect discerning home cooks and professional chefs with the world's most extraordinary spices, while supporting the communities that grow them. Every jar we sell represents our commitment to flavor, quality, and sustainability."</p>
                            </div>

                            <div className="flex items-center">
                                {/* <img src="img/sign.jpg" alt="Signature" className="h-12 w-auto mr-4" /> */}
                                <div>
                                    <p className="font-medium text-white">Dr. Gemba Richardson</p>
                                    <p className="text-sm text-white">Founder & CEO</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div data-aos="fade-down" className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Get in Touch</h2>
                        <p className="text-gray-200 max-w-2xl mx-auto">Have questions about our products or need culinary advice? Our team is here to help you find the perfect spices for your needs.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                        <div className="lg:col-span-1">
                            <div data-aos="flip-left" className="bg-gray-100 rounded-lg shadow-md p-8 h-full">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-primary rounded-full mr-4 flex-shrink-0">
                                            <i class="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                                            <p className="text-gray-600"> Spice Avenue<br />Rathnapura, OR 97205<br />Sri lanka</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-primary rounded-full mr-4 flex-shrink-0">
                                            <i class="fa-solid fa-envelope"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                                            <p className="text-gray-600">Gemba@spicehaven.com<br />support@spicehaven.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-primary rounded-full mr-4 flex-shrink-0">
                                            <i class="fa-solid fa-phone"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                                            <p className="text-gray-600">+1 (800) 555-SPICE<br />+1 (503) 555-1234</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-primary rounded-full mr-4 flex-shrink-0">
                                            <i class="fa-solid fa-clock"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-1">Hours</h4>
                                            <p className="text-gray-600">Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM<br />Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h4 className="font-medium text-gray-900 mb-3">Follow Us</h4>
                                    <div className="flex space-x-4">
                                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-900 hover:text-white text-gray-600 rounded-full transition-colors">
                                            <i class="fa-brands fa-facebook"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-900 hover:text-white text-gray-600 rounded-full transition-colors">
                                            <i class="fa-brands fa-instagram"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-900 hover:text-white text-gray-600 rounded-full transition-colors">
                                            <i class="fa-brands fa-youtube"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-900 hover:text-white text-gray-600 rounded-full transition-colors">
                                            <i class="fa-brands fa-pinterest"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div data-aos="zoom-in" className="bg-gray-100 rounded-lg p-8 h-full">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>

                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary" placeholder="Your name" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary" placeholder="Your email" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                            <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary" placeholder="Subject" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                            <textarea id="message" rows="5" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary" placeholder="Your message"></textarea>
                                        </div>

                                        <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                            Send Message
                                        </button>
                                    </form>
                                </div>

                                <div data-aos="flip-right" className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            backgroundImage: "url('https://storage.vivago.ai/image/p_7d71df8c-2191-11f0-83f6-4ec527a7d236.jpg?width=512')",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                        }}
                                    ></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-primary/5">
                <div data-aos="fade-down" data-aos-duration='3000' className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-100 mb-4">Join Our Spice Community</h2>
                        <p className="text-gray-100 mb-8">Subscribe to our newsletter for exclusive recipes, special offers, and spice knowledge delivered to your inbox.</p>

                        <form className="flex flex-col sm:flex-row gap-4">
                            <input type="email" className="text-white flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-primary" placeholder="Your email address" />
                            <button className="hidden md:block bg-secondary text-white px-6 py-2 font-medium rounded-md whitespace-nowrap hover:!bg-blue-800 transition-colors">
                                Subscribe
                            </button>
                        </form>

                        <p className="text-sm text-gray-100 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
                    </div>
                </div>
            </section>

            <FooterComponent />
        </div>
    )
}

export default Home