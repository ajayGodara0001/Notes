import React from 'react'
import { Pin, Edit, Trash2, Eye } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

function FullNote() {
    const location = useLocation();
    const navigate = useNavigate();

    // Access data passed from useNavigate
    const data = location.state || [];
    return (

        <>
          
            <div className="bg-fuchsia-50 shadow-lg rounded-lg p-4 border border-blue-300 mx-2 md:mx-20 mt-5  flex flex-col justify-between">

                {/* Title and Date */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-blue-800 mb-3 ">
                        {data.title}
                    </h2>
                    <Pin className="w-5 h-5 text-yellow-500 cursor-pointer" />
                </div>

                <span className="text-sm text-gray-500 mb-3">{data.date}</span>
                {/* Content */}
                <p className="text-sm mb-3 text-gray-700 ">
                    {data.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-400 text-white text-xs px-2 py-1 rounded-lg mr-2"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

            
                
                <button className='bg-blue-400 hover:bg-blue-900 w-fit self-center  transition ease-in-out hover:text-white  mt-10 font-bold text-xl p-3 rounded-md  cursor-pointer ' onClick={() => navigate(-1)}>Back</button>
            </div>

        </>

    )
}

export default FullNote
