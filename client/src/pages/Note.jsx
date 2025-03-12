import React from 'react';
import { Pin, Edit, Trash2, Eye, TestTube } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Card = ({ title, date, content, tags, _id }) => {
    const navigate = useNavigate()
    const handledelete  = async()=>{
               await  axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/deletenote/${_id}`, {withCredentials:true})
               .then((response) =>{
                toast.success(response.data.message)
                window.location.reload()
            })
            .catch((error) =>{
                toast.error(error)
               })
    }
    return (
        <div  className="bg-white shadow-lg rounded-lg p-4 border border-blue-300  h-76 m-2 hover:scale-110 transition ease-in-out flex flex-col justify-between">

            {/* Title and Date */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-blue-800 text-ellipsis overflow-hidden whitespace-nowrap w-40">
                    {title}
                </h2>
                <Pin className="w-5 h-5 text-yellow-500 cursor-pointer" />
            </div>

            <span className="text-sm text-gray-500">{date}</span>
            {/* Content */}
            <p className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-3">
                {content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-400 text-white text-xs px-2 py-1 rounded-lg mr-2"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Icons */}
            <div className="flex justify-end items-center mt-3">
                <div className="flex gap-2">
                    <Edit onClick={() => navigate("/edit", {
        state: {
            title,
            date,
            content,
            tags,
            _id,
        }
    })} className="w-5 h-5 text-green-500 cursor-pointer" />
                    <Trash2 className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={handledelete}
                    />
                    <Eye  onClick={() => navigate("/view", {
        state: {
            title,
            date,
            content,
            tags
        }
    })} className="w-5 h-5 text-blue-500 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default Card;
