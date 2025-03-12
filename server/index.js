import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import jwt from "jsonwebtoken";
import User from "./model/user.model.js";
import Note from "./model/note.model.js";
const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true 
}));

const secret_key = process.env.SECRET_KEY

const authenticate = async (req, res, next) => {
    const token = req.cookies?.token;


    // Safely access cookies
    if (!token) {
        
        return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    try {
        const { email } = jwt.verify(token, secret_key);


        // Ensure the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Unauthorized - User not found" });
        }
        
        req.user = user;  // Assign the found user
      
        next();
    } catch (error) {
        return res.status(400).json({ message: "Unauthorized - Invalid token" });
    }
};


(async () => {
    try {
await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
})();

app.post("/api/register", async (req, res) => {
   try {
    const { name, email, password } = req.body;       
    if(!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });  
       }
   
       const isUser = await User
       .findOne({ email }) 
   
       
       if(isUser) {
           return res
           .status(400)
           .json({ message: "User already exists" });
        }
        
        const user = new User({ name, email, password });
        await user.save();
        req.user = user;
        const token  = jwt.sign({ email }, secret_key, { expiresIn: "100h" });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: false,       // ❗️ `false` for localhost; `true` for production with HTTPS
        //     sameSite: "Lax",     // ✅ Best for localhost (prevents CSRF)
        //     path: "/",           // ✅ Ensure path is `/` for all routes
        //     maxAge: 100 * 60 * 60 * 1000 // 100 hours
        // });

        res.cookie("token", token, {
            httpOnly: true,      // ✅ Prevents client-side access (Security)
            secure: true,        // ✅ Required for `SameSite=None` (HTTPS only)
            sameSite: "None",    // ✅ Required for cross-site requests (e.g., different domains)
            path: "/",           // ✅ Accessible across all routes
            maxAge: 100 * 60 * 60 * 1000 // 100 hours
        });

        res
        .status(201)
        .json({ message: "User created successfully", user: user });

   } catch (error) {
    return res.status(400).json({ message: "not registered",   });
    
   }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if(user.password !== password) {
            return res.status(400).json({ message: "incorrect password" });
        }
        req.user = user;
  const token = jwt.sign({ email }, secret_key, { expiresIn: "100h" });
 
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: false,       //  `false` for localhost; `true` for production with HTTPS
//     sameSite: "Lax",     // ✅ Best for localhost (prevents CSRF)
//     path: "/",           // ✅ Ensure path is `/` for all routes
//     maxAge: 100 * 60 * 60 * 1000 // 100 hours
// });

res.cookie("token", token, {
    httpOnly: true,      // ✅ Prevents client-side access (Security)
    secure: true,        // ✅ Required for `SameSite=None` (HTTPS only)
    sameSite: "None",    // ✅ Required for cross-site requests (e.g., different domains)
    path: "/",           // ✅ Accessible across all routes
    maxAge: 100 * 60 * 60 * 1000 // 100 hours
});
        res.status(200).json({ message: "Login successful",  user: user });
    } catch (error) {     
        return res.status(400).json({ message: "not logged in" });
    }
});

app.get("/api/user", authenticate , async (req, res) => {
    
    const user  = req.user;
   
    res.status(200).json({user:user});
});

app.get("/api/logout", (req, res) => {
    res.clearCookie("token");   
    res.status(200).json({ message: "Logged out successfully" });
});


app.get("/api/allnotes", authenticate, async (req, res) => {
    try {
        const user = req.user;
       
        
        const notes = await Note.find({ userId: user._id });
       
        
        res.status(200).json(notes);
    } catch (error) {
        return res.status(400).json({ message: "notes not found" });
    }
});

app.post("/api/addnote", authenticate, async (req, res) => {  
    try {
        const { title, content, tags } = req.body;
        const  user  = req.user;
        if(!title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

    
        
        const note = new Note({
            title,
            content,
            tags,
            userId: user._id
        });
        await note.save();
       
        
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}); 

app.delete("/api/deletenote/:id", async (req, res) => { 
    try {

        const { id } = req.params;
        console.log(id);
        
        await Note.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.put("/api/updatenote/:id", authenticate, async (req, res) => {
    try {
        console.log("heello");
        
        const { id }  = req.params;
        console.log(id);
        
        const { title, content, tags } = req.body;
        if(!title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }   
        
        await Note.findByIdAndUpdate(id, { title, content, tags });    
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }       
}
);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});