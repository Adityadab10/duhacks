import React from "react";
import { Card, Button } from "@/components/ui/index";

const JobCard = ({ job }) => {
  return (
    <Card className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.description}</p>
      <Button className="mt-4 w-full">Apply Now</Button>
    </Card>
  );
};

export default JobCard;