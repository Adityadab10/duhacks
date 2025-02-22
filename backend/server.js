const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Change if using a different port
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ userId, chatPartnerId }) => {
    const roomId = [userId, chatPartnerId].sort().join("_");
    socket.join(roomId);
    console.log(`${userId} joined room: ${roomId}`);
  });

  socket.on("message", (data) => {
    const roomId = [data.sender, data.receiver].sort().join("_");
    io.to(roomId).emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
