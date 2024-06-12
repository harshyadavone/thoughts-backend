import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import postRoutes from "./routes/postRoute";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());
// app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on localhost : ${port}`);
});
