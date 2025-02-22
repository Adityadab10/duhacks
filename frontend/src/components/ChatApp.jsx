import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const PeerChat = ({ userId, chatRoom }) => {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = io('http://localhost:4000', {
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setSocket(socket);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Failed to connect to WebSocket server');
    });

    socket.emit("joinRoom", chatRoom);

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatRoom]);

  const sendMessage = () => {
    if (input.trim()) {
      const messageData = {
        sender: userId,
        content: input,
        timestamp: new Date().toISOString(),
      };
      socket.emit("message", { room: chatRoom, message: messageData });
      setInput("");
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flex flex-col max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <div className="h-64 overflow-y-auto border-b mb-4 p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-lg ${
              msg.sender === userId
                ? "bg-blue-500 text-white self-end text-right"
                : "bg-gray-300 text-black self-start text-left"
            }`}
          >
            <strong>{msg.sender === userId ? "You" : "Stranger"}:</strong> {msg.content}
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
};

export default PeerChat;
