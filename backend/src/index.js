import express from "express";
import cors from "cors";
import connectDB from "./DB/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

console.log(`I am getting in the answer of ${process.env.PORT}`);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    creadentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  console.log("socket ko call lagayi gayi hai bhai");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on("joinroom", (room) => {
    socket.join(room);
    console.log(`A user joined room: ${room}`);
  });
  socket.emit("message", "Hello from server!");
  socket.on("message", (p) => {
    console.log(p);
  });
});

app.use(cors());

app.use(express.json());

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 4000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
