import React from "react";

const Card = ({ title, description, children, className = "" }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 border border-gray-200 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Card;
