import React from "react";
import { Card, Button } from "@/components/ui/index";

const JobCard = ({ job }) => {
  return (
    <Card className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            New
          </span>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3">{job.description}</p>
        
        <div className="flex items-center justify-between">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Apply Now
          </Button>
          <button className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200">
            Learn More →
          </button>
        </div>
      </div>
    </Card>
  );
};


export default JobCard;