import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Briefcase, Users, BarChart, Clock } from "lucide-react";
import JobBoard from "./JobBoard";
import ChatApp from "../ChatApp";
import { useChat } from "../../context/ChatContext";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userId, setUserId] = useState("company-1"); // Set a default ID for testing
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const { startChat } = useChat();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // For testing, we'll use a fixed company ID
    setUserId("company-1");
  }, []);

  const handleStartChat = (freelancerId) => {
    setSelectedFreelancer(freelancerId);
    setIsChatOpen(true);
    startChat("company-1", freelancerId); // Use the fixed ID
  };

  const stats = [
    { title: "Active Jobs", value: "15", icon: Briefcase, color: "text-blue-500" },
    { title: "Total Applications", value: "126", icon: Users, color: "text-green-500" },
    { title: "Hired Freelancers", value: "8", icon: BarChart, color: "text-purple-500" },
    { title: "Avg. Time to Hire", value: "5 days", icon: Clock, color: "text-orange-500" }
  ];

  const activeProjects = [
    { title: "Web Design", budget: "450$", applications: "15" },
    { title: "App Design", budget: "300$", applications: "8" },
    { title: "UI/UX Design", budget: "600$", applications: "12" }
  ];

  return (
    <div className="min-h-screen bg-[#F5EEEB]">
      {/* Header */}
      

      <div className="container pt-24 mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10 mr-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Projects Slider */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Working On</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeProjects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded">{project.budget}</span>

                    </div>
                    <p className="text-sm text-gray-600">{project.applications} applications</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Board Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <JobBoard />
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Messages</h2>
                </div>
                
                {/* Chat Interface */}
                {/* <div className="flex flex-col h-[600px]">
                  {!isChatOpen ? (
                    <ChatList 
                      userId={userId}
                      onChatSelect={handleStartChat}
                      userRole="company"
                    />
                  ) : (
                    <div>
                      <button
                        onClick={() => setIsChatOpen(false)}
                        className="mb-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Messages
                      </button>
                      <ChatApp
                        userId={userId}
                        chatPartnerId={selectedFreelancer}
                        userRole="company"
                      />
                    </div>
                  )}
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;