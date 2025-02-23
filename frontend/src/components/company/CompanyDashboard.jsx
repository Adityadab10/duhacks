import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobBoard from "./JobBoard";
import CompanyHero from "./CompanyHero";
import ChatDrawer from "../ChatDrawer";
import ChatList from "../ChatList";
import { useChat } from "../../context/ChatContext";
import { MessageCircle } from 'lucide-react';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { startChat } = useChat();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      navigate('/company/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserId(userData.id || userData.email);
    }
  }, []);

  const handleStartChat = (freelancerId) => {
    startChat(userId, freelancerId);
    setIsChatOpen(true);
  };

  const handleSubmit = async (formData) => {
    const response = await fetch("http://localhost:4000/api/company/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log('Response status:', response.status); // Add this line
    const data = await response.json();
    console.log('Response data:', data); // Add this line
  };

  return (
    <div className="min-h-screen bg-[#f5efeb]">
      {/* Company Hero Section */}
      <CompanyHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Company Dashboard</h2>
              
              {/* Job Openings Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold mb-4">Available Positions</h3>
                  <p className="text-gray-600">
                    Explore open positions and find top talent for your company.
                  </p>
                </div>

                {/* Job Board Component */}
                <JobBoard onChatWithFreelancer={handleStartChat} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat List */}
            <ChatList 
              userId={userId}
              onChatSelect={() => setIsChatOpen(true)}
            />
            
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              {/* Add stats content */}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        userId={userId}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default CompanyDashboard;
