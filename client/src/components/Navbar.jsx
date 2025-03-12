import React, { useState } from 'react';
import { X, Search, Menu } from "lucide-react";
import getInitials from '../utils/helper';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ value, user, handleSearch, closeSearch, onchangeSearch }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

    const handleLogout = async () => {
        try {
            await axios.get(`${ import.meta.env.VITE_BACKEND_URI}/api/logout`, { withCredentials: true });
            toast.success("Logged out successfully");
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <>
          
            <div className="flex  justify-between items-center px-5 py-3 bg-blue-900 text-white shadow-md">

                {/* Logo */}
                <div>
                    <h1 className="font-medium text-xl">Notes</h1>
                </div>

                {/* Search Bar - Hidden on Mobile */}
                <div className="hidden md:flex bg-gray-300 text-black rounded-lg items-center px-2 py-2 w-64">
                    <input 
                        type="text"
                        value={value}
                        className="outline-none text-black w-full"
                        placeholder="Search"
                        onChange={onchangeSearch}
                    />
                    {value && (
                        <X onClick={closeSearch} className="w-5 h-5 cursor-pointer" />
                    )}
                    <Search className="w-5 h-5 cursor-pointer" />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center md:hidden">
                    <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
                </div>

                {/* Desktop Profile Section */}
                <div className="hidden md:flex gap-5">
                    <div className='h-12 w-12 bg-gray-300 text-black rounded-full flex items-center justify-center'>
                        {getInitials(user)}
                    </div>

                    <div className='flex flex-col font-semibold justify-center items-center'>
                        <h1>{user}</h1>
                        <button
                            className="hover:underline cursor-pointer"
                            onClick={() => {
                                if (user === "User") {
                                    document.getElementById('my_modal_3')?.showModal();
                                } else {
                                    handleLogout();
                                }
                            }}
                        >
                            {user === "User" ? "Login" : "Logout"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Visible Only When Open */}
            {menuOpen && (
                <div className="flex flex-col items-center bg-blue-800 text-white py-3 space-y-3 md:hidden">
                    {/* Search Bar for Mobile */}
                    <div className="flex bg-gray-300 text-black rounded-lg items-center px-2 py-2 w-4/5">
                        <input 
                            type="text"
                            value={value}
                            className="outline-none text-black w-full"
                            placeholder="Search"
                            onChange={onchangeSearch}
                        />
                        {value && (
                            <X onClick={closeSearch} className="w-5 h-5 cursor-pointer" />
                        )}
                        <Search className="w-5 h-5 cursor-pointer" />
                    </div>

                    {/* Profile Section for Mobile */}
                    <div className='h-12 w-12 bg-gray-300 text-black rounded-full flex items-center justify-center'>
                        {getInitials(user)}
                    </div>

                    <div className='text-center'>
                        <h1>{user}</h1>
                        <button
                            className="hover:underline cursor-pointer"
                            onClick={() => {
                                if (user === "User") {
                                    document.getElementById('my_modal_3')?.showModal();
                                } else {
                                    handleLogout();
                                }
                            }}
                        >
                            {user === "User" ? "Login" : "Logout"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
