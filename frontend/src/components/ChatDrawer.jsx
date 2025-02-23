import React, { useEffect, useState } from "react";
import ChatApp from "./ChatApp";
import { useChat } from "../context/ChatContext";
import { X } from "lucide-react";

const ChatDrawer = ({ userId, userRole, isOpen, onClose }) => {
  const { currentChatPartner, messages, fetchMessages } = useChat();
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (currentChatPartner && isOpen) {
      fetchMessages(currentChatPartner.id);
      setChatOpen(true);
    } else {
      setChatOpen(false);
    }
  }, [currentChatPartner, isOpen, fetchMessages]);

  if (!chatOpen || !currentChatPartner) return null;

  return (
    <div
      className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">
            Chat with {currentChatPartner.name} ({userRole === "client" ? "Freelancer" : "Client"})
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat App */}
        <div className="flex-1 overflow-hidden">
          <ChatApp
            userId={userId}
            chatPartnerId={currentChatPartner.id}
            userRole={userRole}
            messages={messages[currentChatPartner.id] || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;
