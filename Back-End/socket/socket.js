const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query?.userId;
  
  if (!userId) {
    console.warn("User connected without userId");
    return;
  }

  // যদি আগের সংযোগ থাকে, সেটাকে ডিসকানেক্ট করে নতুন সংযোগ সেট করো
  if (userSocketMap[userId]) {
    const existingSocketId = userSocketMap[userId];
    io.to(existingSocketId).emit("forceDisconnect"); // পুরাতন সেশন বন্ধ করার নির্দেশ পাঠাও
  }

  userSocketMap[userId] = socket.id;
  console.log(`User connected: UserId=${userId}, SocketId=${socket.id}`);

  io.emit("getOnlineUser", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log(`User disconnected: UserId=${userId}, SocketId=${socket.id}`);
    
    if (userId) {
      delete userSocketMap[userId];
    }
    
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };
