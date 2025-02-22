import React from "react";
import JobBoard from "./company/JobBoard";
import CompanyLoginPage from "./company/CompanyLogin";


const CDash = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Our Job Portal</h1>
      <JobBoard />
      <CompanyLoginPage/>
      
    </div>
  );
};

export default CDash;