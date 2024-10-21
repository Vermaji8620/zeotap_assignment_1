import express from "express";
import mongoose from "mongoose";
import ruleRoutes from "./routes/ruleRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api", ruleRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
