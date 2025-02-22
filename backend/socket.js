const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Your frontend URL
      methods: ["GET", "POST"]
    }
  });

  const rooms = new Map(); // Store room information

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ room, userId }) => {
      socket.join(room);
      
      // Initialize room if it doesn't exist
      if (!rooms.has(room)) {
        rooms.set(room, new Set());
      }
      
      // Add user to room
      rooms.get(room).add(userId);
      
      // Broadcast to others in room
      socket.to(room).emit("userJoined", userId);
      
      // Send current users to the joining user
      socket.emit("currentUsers", Array.from(rooms.get(room)));
    });

    socket.on("leaveRoom", ({ room, userId }) => {
      socket.leave(room);
      
      // Remove user from room
      if (rooms.has(room)) {
        rooms.get(room).delete(userId);
        if (rooms.get(room).size === 0) {
          rooms.delete(room);
        }
      }
      
      // Broadcast to others
      socket.to(room).emit("userLeft", userId);
    });

    socket.on("message", ({ room, message }) => {
      io.to(room).emit("message", message);
    });

    socket.on("typing", ({ room, userId, isTyping }) => {
      socket.to(room).emit("userTyping", { userId, isTyping });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      
      // Clean up user from all rooms
      rooms.forEach((users, room) => {
        users.forEach((userId) => {
          if (socket.rooms.has(room)) {
            io.to(room).emit("userLeft", userId);
            users.delete(userId);
          }
        });
        
        if (users.size === 0) {
          rooms.delete(room);
        }
      });
    });
  });

  return io;
}

module.exports = initializeSocket;
