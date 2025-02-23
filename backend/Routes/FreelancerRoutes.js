// filepath: /C:/Users/russe/Desktop/duhacks/backend/routes/FreelancerRoutes.js
const express = require("express");
const { registerOrLoginFreelancer, getFreelancerProfile,updateFreelancerProfile } = require("../controllers/FreelancerController");
const router = express.Router();

router.post("/registerOrLogin", registerOrLoginFreelancer);
router.get("/profile/:firebaseUID", getFreelancerProfile);
router.put('/profile/:firebaseUID', updateFreelancerProfile);

module.exports = router;