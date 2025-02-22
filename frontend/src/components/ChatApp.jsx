import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ChatApp({ userId, chatRoom }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", chatRoom);

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
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
}
