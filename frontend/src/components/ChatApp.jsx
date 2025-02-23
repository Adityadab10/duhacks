import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Send, AlertCircle } from "lucide-react";

const socket = io("http://localhost:4000");

export default function ChatApp({ userId, chatPartnerId, userRole }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const roomId = [userId, chatPartnerId].sort().join("_");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Join chat room
    socket.emit("joinRoom", { roomId, userId, userType: userRole });

    // Load past messages
    const loadMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/messages/${roomId}`);
        if (res.data && Array.isArray(res.data)) {
          setMessages(res.data);
        }
      } catch (err) {
        setError("Failed to load messages");
        console.error("Error loading messages:", err);
      }
    };
    loadMessages();

    // Socket event listeners
    const messageListener = (message) => {
      setMessages((prev) => [...prev, message]);
      setError(null);
    };

    const recentMessagesListener = (messages) => {
      if (Array.isArray(messages)) {
        setMessages(messages);
        setError(null);
      }
    };

    const userJoinedListener = ({ onlineUsers: users }) => {
      setOnlineUsers(new Set(users));
    };

    const userLeftListener = ({ onlineUsers: users }) => {
      setOnlineUsers(new Set(users));
    };

    const errorListener = (errorMessage) => {
      setError(errorMessage);
      console.error("Socket error:", errorMessage);
    };

    socket.on("message", messageListener);
    socket.on("recentMessages", recentMessagesListener);
    socket.on("userJoined", userJoinedListener);
    socket.on("userLeft", userLeftListener);
    socket.on("error", errorListener);

    return () => {
      socket.off("message", messageListener);
      socket.off("recentMessages", recentMessagesListener);
      socket.off("userJoined", userJoinedListener);
      socket.off("userLeft", userLeftListener);
      socket.off("error", errorListener);
    };
  }, [roomId, userId, userRole]);

  const sendMessage = async () => {
    if (input.trim()) {
      try {
        const messageData = {
          roomId,
          sender: userId || "company-1",
          content: input.trim(),
          timestamp: new Date().toISOString()
        };

        const response = await axios.post("http://localhost:4000/api/messages", messageData);
        
        if (response.data) {
          socket.emit("message", response.data);
          setInput("");
          setError(null);
          setMessages(prev => [...prev, response.data]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
      }
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-[500px] max-w-2xl mx-auto rounded-lg shadow-lg bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
        <div>
          <h2 className="text-lg font-semibold">
            Chat with {userRole === "company" ? "Freelancer" : "Company"}
          </h2>
          <p className="text-sm text-gray-500">
            {onlineUsers.has(chatPartnerId) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 p-2 rounded">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="break-words">{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === userId ? "text-blue-100" : "text-gray-500"
              }`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
