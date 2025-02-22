import React from "react";

const Textarea = (props) => {
  return (
    <textarea
      className="w-full p-2 border border-gray-300 rounded"
      {...props}
    />
  );
};

export default Textarea;
