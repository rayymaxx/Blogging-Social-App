/*
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './Routes/authRoutes.js'; 
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from './Routes/postRoutes.js';

// Initialize dotenv 
dotenv.config();

// Creating the express app
const app = express();


// Then we will  use middleware and routes
app.use(cors());
>>>>>>> ae2d965114eff26e0780444ec9cc2859fcd4e705
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
*/
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from './Routes/postRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'https://blogging-social-app.vercel.app/', 
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes); 
app.use("/api/posts", postRoutes); //Post Routes
app.use("/api/auth", authRoutes);  // Authentication routes



const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🌍 Server running on http://localhost:${PORT}`)
);

