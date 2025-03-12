import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register   from './pages/Signup'
import FullNote from './pages/FullNote'

import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar'
import AddNote from './pages/AddNote'
import axios from 'axios'
import EditNote from './pages/EditNote'
function App() {

     const [searchItem, setSearchItem] = useState('')
     const handleSearch = (e) => {
    }
    function closeSearch() {
       setSearchItem('')
    }
 
    function onchangeSearch(e) {
       setSearchItem(e.target.value)
    }
   const [user, setUser] = useState(""); 
   useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/user`, { withCredentials: true });
            console.log("✅ User Fetched:", response.data);
            setUser(response.data.user.name);
        } catch (error) {
            console.error("❌ Error fetching user:", error);
            setUser("User");
        }
    };

    fetchUser();
}, []);
  
  return (
    <>
    <Login />
     <Router>
       <Navbar value={searchItem} user={user} closeSearch={closeSearch} handleSearch={handleSearch} onchangeSearch={onchangeSearch} />
    <Register />
       <Routes>
         <Route path="/" element={<Home user={user} />} />
         <Route path="/register" element={<Register />} />
         <Route path="/view" element={<FullNote />} />
         <Route path="/add" element={<AddNote />} />
         <Route path="/edit" element={<EditNote />} />
       </Routes>
     </Router>
     <Toaster />
    </>
  )
}

export default App
