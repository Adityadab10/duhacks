// filepath: /C:/Users/russe/Desktop/duhacks/backend/routes/FreelancerRoutes.js
const express = require("express");
const { registerFreelancer } = require("../controllers/FreelancerController");
const router = express.Router();

router.post("/register", registerFreelancer);

module.exports = router;