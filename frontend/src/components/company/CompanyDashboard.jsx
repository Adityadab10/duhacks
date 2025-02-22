import React from "react";
import { useNavigate } from "react-router-dom";
import JobBoard from "./JobBoard";
import CompanyHero from "./CompanyHero";

const CompanyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5efeb]">
      {/* Company Hero Section */}
      <CompanyHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8 tracking-tight">
            Company Dashboard
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            {/* Job Openings Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Available Positions
                </h2>
                <p className="text-gray-600">
                  Explore open positions and find top talent for your company.
                </p>
              </div>

              {/* Job Board Component */}
              <JobBoard />

              {/* Button to Create Job Opening */}
              <div className="text-center mt-6">
                <button
                  onClick={() => navigate("/create-job")}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all" 
                >
                  Create a Job Opening
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
