const express = require("express");
const { createJob } = require("../controllers/jobController");

const router = express.Router();

// Create a new job
router.post("/jobs", createJob);

module.exports = router;