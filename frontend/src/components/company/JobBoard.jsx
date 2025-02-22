import React, { useState } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";

const JobBoard = () => {
  const [jobs, setJobs] = useState([
    { 
      title: "Senior Web Developer", 
      description: "We're looking for a React expert with 5+ years of experience in building scalable web applications. Experience with Next.js and TypeScript is a plus.", 
      id: 1 
    },
  ]);

  const addJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Job Board</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find your next opportunity or post a new position for your team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <JobForm addJob={addJob} />
      </div>
    </div>
  );
};

export default JobBoard;