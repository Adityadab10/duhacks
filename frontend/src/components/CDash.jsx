import React from "react";
import JobBoard from "./company/JobBoard";
import CompanyLoginPage from "./company/CompanyLogin";

const CDash = () => {
  return (
    <div className="min-h-screen bg-[#f5efeb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8 tracking-tight">
            Welcome to Our Job Portal
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Available Positions
                </h2>
                <p className="text-gray-600">
                  Explore open positions and find your next opportunity
                </p>
              </div>
              
              <JobBoard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDash;