import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './Routes/authRoutes.js'; 
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from './Routes/postRoutes.js';

// Initialize dotenv as early as possible
dotenv.config();

// Create the Express app first
const app = express();

// Then use your middleware and routes
app.use(cors({
  origin: 'https://blogging-social-app.vercel.app/', 
  credentials: true
}));

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);



connectDB(); // Connect to MongoDB 

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
res.send("🌍 API is running...");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "✅ Backend connected successfully!" });
});


app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});
