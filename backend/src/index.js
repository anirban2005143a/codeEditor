import express from "express";
import cors from "cors";
import connectDB from "./DB/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();
console.log(`I am getting in the answer of ${process.env.PORT}`);
app.use(cors());
app.use(express.json());
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
