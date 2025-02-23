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
    let freelancer = await Freelancer.findOne({ firebaseUID });

    if (freelancer) {
      return res.status(200).json({ message: "Freelancer already exists", freelancer });
    }

    // Create a new freelancer
    freelancer = new Freelancer({
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

    await freelancer.save();

    res.status(201).json({ message: "Freelancer registered successfully", freelancer });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const getFreelancerProfile = async (req, res) => {
  try {
    console.log("Received request to fetch freelancer profile.");

    // Extract the firebaseUID from request parameters
    const { firebaseUID } = req.params;
    console.log("Extracted firebaseUID from params:", firebaseUID);

    if (!firebaseUID) {
      console.error("firebaseUID is missing in request parameters.");
      return res.status(400).json({ message: "firebaseUID is required" });
    }

    // Query the database for a freelancer with the given firebaseUID
    console.log("Searching for freelancer in database...");
    const freelancer = await Freelancer.findOne({ firebaseUID });

    if (!freelancer) {
      console.warn(`No freelancer found with firebaseUID: ${firebaseUID}`);
      return res.status(404).json({ message: "Freelancer not found" });
    }

    console.log("Freelancer profile found:", freelancer);
    res.status(200).json(freelancer);
  } catch (error) {
    console.error("Error fetching freelancer profile:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const updateFreelancerProfile = async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    const updates = req.body;

    const freelancer = await Freelancer.findOneAndUpdate({ firebaseUID }, updates, { new: true });

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json(freelancer);
  } catch (error) {
    console.error("Error updating freelancer profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { registerFreelancer, getFreelancerProfile,updateFreelancerProfile };