require('dotenv').config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Message = require('./models/Message');
const ChatApp = require('./models/ChatApp');
const companyRoutes = require("./routes/companyRoutes");
const freelancerRoutes = require("./routes/FreelancerRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// In-memory storage for companies (temporary, replace with DB later)
const companies = new Map();

// Company Routes
app.use('/api/company', companyRoutes);
app.use("/api", freelancerRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle joining a chat room
  socket.on("joinRoom", async ({ room, userId, userType }) => {
    try {
      socket.join(room);
      
      // Store user information
      activeUsers.set(socket.id, { userId, room });
      
      let chatApp = await ChatApp.findOne({ roomId: room });
      if (!chatApp) {
        chatApp = new ChatApp({
          roomId: room,
          participants: [{
            userId,
            userType,
            lastSeen: new Date()
          }]
        });
      } else {
        const participant = chatApp.participants.find(p => p.userId === userId);
        if (participant) {
          participant.lastSeen = new Date();
        } else {
          chatApp.participants.push({
            userId,
            userType,
            lastSeen: new Date()
          });
        }
      }
      await chatApp.save();

      const recentMessages = await Message.find({ room })
        .sort({ timestamp: -1 })
        .limit(50);
      
      socket.emit("recentMessages", recentMessages.reverse());
      io.to(room).emit("userJoined", userId);
      
      console.log(`User ${userId} joined room: ${room}`);
    } catch (err) {
      console.error('Error in joinRoom:', err);
    }
  });

  // Handle messages
  socket.on("message", async ({ room, message }) => {
    try {
      const newMessage = new Message({
        room,
        sender: message.userId,
        content: message.content,
        timestamp: new Date(),
        messageType: 'text',
        readBy: [{ userId: message.userId, readAt: new Date() }]
      });
      await newMessage.save();

      await ChatApp.findOneAndUpdate(
        { roomId: room },
        {
          lastMessage: {
            content: message.content,
            sender: message.userId,
            timestamp: new Date()
          },
          updatedAt: new Date()
        }
      );

      io.to(room).emit("message", newMessage);
    } catch (err) {
      console.error('Error in message handling:', err);
    }
  });

  // Handle typing status
  socket.on("typing", ({ room, userId, isTyping }) => {
    socket.to(room).emit("userTyping", { userId, isTyping });
  });

  // Handle leaving a room
  socket.on("leaveRoom", async ({ room, userId }) => {
    try {
      await handleUserLeaving(socket, room, userId);
    } catch (err) {
      console.error('Error in leaveRoom:', err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", async () => {
    try {
      const userInfo = activeUsers.get(socket.id);
      if (userInfo) {
        const { room, userId } = userInfo;
        await handleUserLeaving(socket, room, userId);
        activeUsers.delete(socket.id);
      }
      console.log("User disconnected:", socket.id);
    } catch (err) {
      console.error('Error in disconnect:', err);
    }
  });
});

// Helper function to handle user leaving
async function handleUserLeaving(socket, room, userId) {
  try {
    await ChatApp.findOneAndUpdate(
      { roomId: room, 'participants.userId': userId },
      { 'participants.$.lastSeen': new Date() }
    );

    socket.to(room).emit("userLeft", userId);
    socket.leave(room);
    console.log(`User ${userId} left room: ${room}`);
  } catch (err) {
    console.error('Error in handleUserLeaving:', err);
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    activeUsers: activeUsers.size
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


