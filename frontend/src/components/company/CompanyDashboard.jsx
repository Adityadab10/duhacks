import React, { useState } from "react";
import { X, MessageCircle, Briefcase, Users, BarChart, Clock } from 'lucide-react';
import ChatApp from "../ChatApp";
import { useChat } from "../../context/ChatContext";

const CompanyDashboard = () => {
  const { getUserChats } = useChat();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatList, setShowChatList] = useState(false);

  const userId = 'company-1'; // Mock company ID
  const activeChats = getUserChats(userId);

  const handleStartChat = (partnerId) => {
    setSelectedChat(partnerId);
    setShowChatList(false);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
  };

  const stats = [
    { title: "Active Jobs", value: "15", icon: Briefcase, color: "text-blue-500" },
    { title: "Total Applications", value: "126", icon: Users, color: "text-green-500" },
    { title: "Interviews", value: "12", icon: BarChart, color: "text-purple-500" },
    { title: "Time to Hire", value: "14d", icon: Clock, color: "text-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      <div className="container pt-24 mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Board Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Active Job Listings</h2>
              {/* Add your job listings here */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              {/* Add stats content */}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setShowChatList(!showChatList)}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat List Popup */}
      {showChatList && !selectedChat && (
        <div className="fixed bottom-20 right-4 w-72 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Messages</h3>
          </div>
          <div className="p-2">
            {activeChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleStartChat(chat.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{chat.name}</span>
                    {chat.lastMessage && (
                      <span className="text-sm text-gray-500 truncate max-w-[200px]">
                        {chat.lastMessage.content}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      {selectedChat && (
        <div className="fixed bottom-4 right-4 w-80 z-50">
          <div className="bg-white rounded-t-lg shadow-lg">
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold">
                {activeChats.find(chat => chat.id === selectedChat)?.name || "Chat"}
              </h3>
              <button
                onClick={handleCloseChat}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-96">
              <ChatApp
                userId={userId}
                partnerId={selectedChat}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;