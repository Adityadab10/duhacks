const Freelancer = require("../models/Freelancer"); // Import Freelancer model

// Fetch all freelancers
const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find(); // Retrieve all freelancers from MongoDB
    res.status(200).json(freelancers); // Send response with data
  } catch (error) {
    res.status(500).json({ message: "Error fetching freelancers", error });
  }
};

module.exports = { getAllFreelancers };
