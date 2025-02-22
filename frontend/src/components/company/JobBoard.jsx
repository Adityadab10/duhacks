import React, { useState } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";

const JobBoard = () => {
  const [jobs, setJobs] = useState([
    { title: "Web Developer", description: "Looking for a React expert.", id: 1 },
  ]);

  const addJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Company Job Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <JobForm addJob={addJob} />
    </div>
  );
};

export default JobBoard;