// filepath: /C:/Users/russe/Desktop/duhacks/backend/controllers/FreelancerController.js
const Freelancer = require("../models/Freelancer");

const registerFreelancer = async (req, res) => {
  try {
    const {
      firebaseUID,
      bio,
      email,
      name,
      profilePicture,
      resume,
      skills,
      portfolio,
      hourlyRate,
      availability,
      paymentMethod,
      github,
      rating,
      reviews,
    } = req.body;

    // Check if the freelancer already exists
    const existingFreelancer = await Freelancer.findOne({ firebaseUID });
    if (existingFreelancer) {
      return res.status(400).json({ message: "Freelancer already exists" });
    }

    // Create a new freelancer
    const newFreelancer = new Freelancer({
      firebaseUID,
      bio,
      email,
      name,
      profilePicture,
      resume,
      skills,
      portfolio,
      hourlyRate,
      availability,
      paymentMethod,
      github,
      rating,
      reviews,
    });

    await newFreelancer.save();

    res.status(201).json({ message: "Freelancer registered successfully", freelancer: newFreelancer });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { registerFreelancer };