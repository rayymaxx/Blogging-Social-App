import express from "express";
import connectDB from "./config/db.js"; // Path to start the db connection 
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB 
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
res.send("🌍 API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
