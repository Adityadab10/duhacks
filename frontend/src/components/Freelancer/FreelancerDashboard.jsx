import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { MessageCircle } from 'lucide-react';

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserId(userData.id || userData.email);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f5efeb]">
      {/* Freelancer Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-xl">Find your next opportunity</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Your Dashboard</h2>
              
              {/* Dashboard Content */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  {/* Add recent activity content */}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Applications</h3>
                  {/* Add applications list */}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat List */}
          
            
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              {/* Add stats content */}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default FreelancerDashboard;
