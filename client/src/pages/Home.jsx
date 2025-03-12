import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Pin, Trash, Pen, PlusIcon } from 'lucide-react'
import Card from './Note'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const Home = ({ user }) => {
    const navigate = useNavigate()
    const [Notes, setNotes] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(` ${import.meta.env.VITE_BACKEND_URI}/api/allnotes`, { withCredentials: true });
                console.log("✅ Notes Fetched:", response.data);
                setNotes(response.data);
            } catch (error) {
                console.error("❌ Error fetching user:", error.response);
                setNotes([]);
            }
        };

        fetchUser();
    },[])



    return (
        <>
            <div className=' cursor-pointer  flex justify-end mr-6 p-4'>
                <PlusIcon onClick={() => {
                    user === "User" ? document.getElementById('my_modal_3').showModal() : navigate("/add")
                }} className='bg-blue-500 hover:scale-110   rounded-md  h-10 w-10  ' />
            </div>
            {user === "User" ?
                <div className="flex flex-col justify-center items-center h-96">
                    <img
                        src="https://plus.unsplash.com/premium_vector-1731922150859-a415ad4e2a3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGlkZWElMjBib29rfGVufDB8fDB8fHww"
                        alt="No Notes Found"
                        className="w-40 h-40 mb-4 bg-blend-color"
                    />
                    <h1 className='text-xl text-blue-600 font-bold'>Please create Your account</h1>
                    <p className="text-gray-500 mt-2">Start adding notes to keep your thoughts organized.</p>
                </div>
                : Notes.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {Notes.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div> : <div className="flex flex-col justify-center items-center h-96">
                    <img
                        src="https://plus.unsplash.com/premium_vector-1731922150859-a415ad4e2a3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGlkZWElMjBib29rfGVufDB8fDB8fHww"
                        alt="No Notes Found"
                        className="w-40 h-40 mb-4 bg-blend-color"
                    />
                    <h1 className="text-2xl font-bold text-gray-600">Your notebook is empty!</h1>
                    <p className="text-gray-500 mt-2">Start adding notes to keep your thoughts organized.</p>
                </div>
            }

        </>
    )
}

export default Home
