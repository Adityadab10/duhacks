const express = require("express");
const router = express.Router();
const Job = require("../Models/Job");

router.post("/company/createjob", async (req, res) => {
  try {
    const { jobTitle, companyId, pay, time, skills, description } = req.body;

    // Log the input data
    console.log("Received data:", req.body);

    if (!jobTitle || !companyId || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newJob = new Job({
      JobTitle: jobTitle,
      companyId,
      pay,
      time,
      skills,
      description,
      status: "available",
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;