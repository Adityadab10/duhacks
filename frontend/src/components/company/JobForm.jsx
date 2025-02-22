import React, { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui/index";

const JobForm = ({ addJob }) => {
  const [newJob, setNewJob] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newJob.title && newJob.description) {
      addJob(newJob);
      setNewJob({ title: "", description: "" });
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a Job</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Job Description"
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
          className="mb-2"
        />
        <Button type="submit" className="w-full">Post Job</Button>
      </form>
    </div>
  );
};

export default JobForm;