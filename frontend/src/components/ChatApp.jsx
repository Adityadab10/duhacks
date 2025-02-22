import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function FreelancerChat({ userId, chatPartnerId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Join a unique chat room between client & freelancer
    socket.emit("joinRoom", { userId, chatPartnerId });

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [userId, chatPartnerId]);

  const sendMessage = () => {
    if (input.trim()) {
      const messageData = {
        sender: userId,
        receiver: chatPartnerId,
        content: input,
        timestamp: new Date().toISOString(),
      };
      socket.emit("message", messageData);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto border-b mb-4 p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-1 border-b ${msg.sender === userId ? 'text-right' : 'text-left'}`}>
            <strong>{msg.sender === userId ? "You" : "Freelancer"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
