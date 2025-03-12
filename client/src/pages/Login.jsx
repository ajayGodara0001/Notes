import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function handleLogin(e) {
        e.preventDefault()
        if (!email.trim()) {
            setEmailError('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError(''); // Clear error if valid
        }

        // login api
       
  axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/login`, {
    email,
    password
}, { withCredentials: true } )
    .then((response) => {
        console.log(response)
        document.getElementById('my_modal_3').close()
        setEmail("")
        setPassword("")
         toast.success("Login Successfully")
         window.location.reload()
    })
    .catch((error) => {
        console.log(error.response.data.message)
        setEmail("")
        setPassword("")
        toast.error(error.response.data.message)
    }       
)
   
    }

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-gray-100 p-5 rounded-lg shadow-lg w-96">
                    {/* Close Button */}
                    <form method="dialog">
                        <button
                            className="hover:scale-130 hover:cursor-pointer 
                                       absolute right-3 top-2 text-xl text-gray-600"
                        >
                            ✕
                        </button>
                    </form>

                    {/* Title */}
                    <h3 className="font-bold text-xl text-center mb-4">Login</h3>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input  bg-gray-300 w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                        {emailError && <div className='text-red-500'>{emailError}</div>}

                    </div>

                    {/* Password Field */}
                    <div className="mb-3 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className="input bg-gray-300 w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            required
                        />
                        <div
                            className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                    </div>
                    {passwordError && <div className='text-red-500'>{passwordError}</div>}

                    {/* Submit Button */}
                    <button
                        className="btn btn-primary w-full mt-4"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                      
                       
                       <div>
                        <p className="text-center mt-4">
                            Don't have an account?{' '}
                            <span
                               
                             className="hover:underline cursor-pointer text-blue-500 " onClick={() => {document.getElementById('my_modal_4').showModal(), document.getElementById('my_modal_3').close() }
                                
                             }>Register</span>
                         </p>
                             
                       </div>
                </div>
            </dialog>
        </>
    );
}

export default Login;
