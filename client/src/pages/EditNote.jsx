import React, { useEffect, useState } from 'react';
import { X, Plus } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function EditNote() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("enter title");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');

    const location = useLocation();
    const data = location.state || {};

    useEffect(() => {
        if (data) {
            setTitle(data.title || '');
            setContent(data.content || '');
            setTags(data.tags || []);
        }
    }, [data]);

    const handleTagCross = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const editNote = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URI}/api/updatenote/${data._id}`,
                { title, content, tags },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update note");
        }
    };

    return (
        <>
            <div className="bg-fuchsia-50 shadow-lg rounded-lg p-6 border border-blue-300 mx-4 md:mx-20 lg:mx-60 mt-5 flex flex-col">

                {/* Title */}
                <div className="flex flex-col">
                    <label htmlFor="title" className='text-xl font-semibold mb-2'>Title</label>
                    <input 
                        type="text"
                        className='bg-gray-300 w-full py-2 rounded-lg px-3 text-black font-normal'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                {/* Content */}
                <div className='mt-4'>
                    <label htmlFor="content" className='text-xl font-semibold mb-2'>Content</label>
                    <textarea
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='px-3 py-2 mb-3 bg-gray-300 w-full mt-2 rounded-md text-black'
                    />
                </div>

                {/* Tags */}
                <h1 className='mt-4 font-semibold'>Tags</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <div key={index} className='flex bg-blue-300 items-center rounded-lg'>
                            <span className="bg-blue-300 text-black text-lg px-2 py-1 rounded-lg mr-2">
                                #{tag}
                            </span>
                            <X
                                onClick={() => handleTagCross(tag)}
                                className='cursor-pointer text-black w-4 h-4 mr-1'
                            />
                        </div>
                    ))}
                </div>

                {/* Add Tags Input */}
                <div className='bg-transparent mt-3 flex relative'>
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className='bg-gray-300 w-full py-2 rounded-md px-3 text-black font-normal'
                        placeholder='Add a tag'
                    />
                    <Plus
                        onClick={() => {
                            if (tag.trim()) {
                                setTags([...tags, tag]);
                                setTag("");
                            }
                        }}
                        className='absolute top-2 right-3 cursor-pointer w-6 h-6 text-blue-500'
                    />
                </div>

                {/* Save & Back Buttons */}
                <div className='flex flex-col md:flex-row items-center justify-center gap-4 mt-6'>
                    <button
                        onClick={editNote}
                        className='bg-blue-400 hover:bg-blue-900 w-full md:w-40 lg:w-48 transition ease-in-out hover:text-white font-semibold text-xl p-3 rounded-md cursor-pointer'
                    >
                        UPDATE
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className='bg-blue-400 hover:bg-blue-900 w-full md:w-40 lg:w-48 transition ease-in-out hover:text-white font-bold text-xl p-3 rounded-md cursor-pointer'
                    >
                        Back
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditNote;
