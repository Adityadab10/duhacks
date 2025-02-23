import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

export default function ChatApp({ userId, chatPartnerId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const roomId = [userId, chatPartnerId].sort().join("_"); // Unique Room ID

  useEffect(() => {
    // Join chat room
    socket.emit("joinRoom", { roomId });

    // Listen for incoming messages
    const messageListener = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", messageListener);

    // Cleanup on unmount
    return () => {
      socket.off("message", messageListener);
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (input.trim()) {
      const messageData = {
        sender: userId,
        receiver: chatPartnerId,
        content: input,
        roomId, // Updated from chatRoomId
      };

      socket.emit("message", messageData);
      setMessages((prev) => [...prev, messageData]); // Instant UI update
      setInput("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-gray-100">
      <div className="h-64 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${
              msg.sender === userId ? "bg-blue-500 text-white text-right" : "bg-gray-300 text-left"
            }`}
          >
            <strong>{msg.sender === userId ? "You" : "Stranger"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          className="flex-1 border p-2 rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Fixed deprecated onKeyPress
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
