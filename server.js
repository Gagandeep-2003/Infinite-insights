import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import axios from "axios";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";  
import { fileURLToPath } from "url";
import fs from "fs";

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// ESModule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve client build
app.use("*", (req, res) => {
  const filePath = path.join(__dirname, "./client/build/index.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.error(`File not found: ${filePath}`);
    res.status(404).send("Not Found");
  }
});

// PORT
const PORT = process.env.PORT || 8080;

// Run the server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
