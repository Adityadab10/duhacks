const mongoose = require("mongoose");

const FreelancerSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true }, // Firebase UID for authentication
  bio: {type: String, required: false}, 
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
  resume: { type: String, required: false },
  skills: { type: [String], required: false }, // List of skills
  portfolio: { type: String }, // Links to portfolio projects
  hourlyRate: { type: Number, required: false }, // Hourly rate in dollars
  availability: { type: String, enum: ["full-time", "part-time", "freelance"], default: "freelance" },
  paymentMethod: { type: [String], enum: ["PayPal", "Stripe", "Bank Transfer"], default: ["PayPal"] },
  github: { type: String},
  rating: {type: Number, required: true, default: 0},
  reviews: {type: Number, required: true, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("Freelancer", FreelancerSchema);
