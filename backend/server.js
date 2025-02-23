const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Change this if needed
    methods: ["GET", "POST"]
  }
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json()); // Add this line to parse JSON bodies

// Routes
app.use("/api", require("./routes/FreelancerRoutes"));

// Global storage for socket connections
const userSockets = new Map(); // Fix: Declare userSockets
const chatRooms = new Map(); // Fix: Declare chatRooms

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ room, userId }) => {
    socket.join(room);

    // Store user information
    userSockets.set(socket.id, { userId, room });

    // Initialize room if it doesn't exist
    if (!chatRooms.has(room)) {
      chatRooms.set(room, new Set());
    }
    chatRooms.get(room).add(userId);

    // Notify others in the room
    io.to(room).emit("userJoined", userId);

    // Send current online users to the new participant
    socket.emit("roomUsers", Array.from(chatRooms.get(room)));

    console.log(`User ${userId} joined room: ${room}`);
  });

  socket.on("message", ({ room, message }) => {
    io.to(room).emit("message", {
      ...message,
      timestamp: new Date().toISOString()
    });
  });

  socket.on("typing", ({ room, userId, isTyping }) => {
    socket.to(room).emit("userTyping", { userId, isTyping });
  });

  socket.on("leaveRoom", ({ room, userId }) => {
    handleUserLeaving(socket, room, userId);
  });

  socket.on("disconnect", () => {
    const userInfo = userSockets.get(socket.id);
    if (userInfo) {
      const { room, userId } = userInfo;
      handleUserLeaving(socket, room, userId);
      userSockets.delete(socket.id); // Fix: Prevent undefined reference
    }
    console.log("User disconnected:", socket.id);
  });
});

// Helper function to handle user leaving
function handleUserLeaving(socket, room, userId) {
  if (chatRooms.has(room)) {
    chatRooms.get(room).delete(userId);
    if (chatRooms.get(room).size === 0) {
      chatRooms.delete(room);
    }
    socket.to(room).emit("userLeft", userId);
    socket.leave(room);
    console.log(`User ${userId} left room: ${room}`);
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", activeRooms: chatRooms.size });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
