import { useState, useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { Send, Smile, Paperclip, MoreVertical, Phone, Video, User } from 'lucide-react';

export default function ChatApp({ userId, chatRoom }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const socketRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handle incoming messages
  const handleMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
    scrollToBottom();
  }, [scrollToBottom]);

  // Handle user typing status
  const handleTyping = useCallback(() => {
    socketRef.current.emit("typing", { room: chatRoom, userId, isTyping: true });
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing", { room: chatRoom, userId, isTyping: false });
    }, 1000);
  }, [chatRoom, userId]);

  // Send message
  const sendMessage = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput || !isConnected) return;

    const messageData = {
      sender: userId,
      content: trimmedInput,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit("message", { room: chatRoom, message: messageData });
    setInput("");
    inputRef.current?.focus();

    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      socketRef.current.emit("typing", { room: chatRoom, userId, isTyping: false });
    }
  }, [input, isConnected, chatRoom, userId]);

  // Setup socket event listeners
  useEffect(() => {
    const socket = io('http://localhost:4000', {
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      socket.emit("joinRoom", { room: chatRoom, userId });
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Failed to connect to WebSocket server');
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from chat server");
    });

    // Chat events
    socket.on("message", handleMessage);
    socket.on("userTyping", ({ userId: typingUserId, isTyping }) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        if (isTyping) {
          newSet.add(typingUserId);
        } else {
          newSet.delete(typingUserId);
        }
        return newSet;
      });
    });

    // User presence events
    socket.on("userJoined", (joinedUserId) => {
      setOnlineUsers(prev => new Set([...prev, joinedUserId]));
    });

    socket.on("userLeft", (leftUserId) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(leftUserId);
        return newSet;
      });
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(leftUserId);
        return newSet;
      });
    });

    socket.on("roomUsers", (users) => {
      setOnlineUsers(new Set(users));
    });

    // Cleanup
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("userTyping");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("roomUsers");
      socket.emit("leaveRoom", { room: chatRoom, userId });
      socket.disconnect();
    };
  }, [chatRoom, userId, handleMessage]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold">Chat Room: {chatRoom}</h2>
            <p className="text-sm text-blue-100">
              {onlineUsers.size} online • {isConnected ? 
                <span className="text-green-300">Connected</span> : 
                <span className="text-red-300">Disconnected</span>
              }
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === userId ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`max-w-[70%] ${
                msg.sender === userId 
                  ? "bg-blue-600 text-white rounded-l-xl rounded-tr-xl" 
                  : "bg-white text-gray-800 rounded-r-xl rounded-tl-xl shadow-sm border border-gray-100"
              } px-4 py-2`}
            >
              <div className="flex flex-col">
                {msg.sender !== userId && (
                  <span className="text-xs text-gray-500 mb-1">
                    User {msg.sender}
                  </span>
                )}
                <div className="flex items-end space-x-2">
                  <p className="text-sm break-words">{msg.content}</p>
                  <span className={`text-xs ${
                    msg.sender === userId ? "text-blue-100" : "text-gray-400"
                  } ml-2 whitespace-nowrap`}>
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {typingUsers.size > 0 && (
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span>
              {Array.from(typingUsers).map(id => `User ${id}`).join(", ")} 
              {typingUsers.size === 1 ? "is" : "are"} typing...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-white border-t">
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={!isConnected}
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              className={`w-full px-4 py-2 rounded-full ${
                isConnected ? "bg-gray-100" : "bg-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
              placeholder={isConnected ? "Type a message..." : "Connecting..."}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleTyping();
              }}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={!isConnected}
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={!isConnected}
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            className={`p-2 rounded-full transition-colors ${
              isConnected && input.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={sendMessage}
            disabled={!isConnected || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
