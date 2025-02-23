const Job = require("../models/Job");

// Create a new job
const createJob = async (req, res) => {
  try {
    console.log("🔹 Received job data:", req.body); // Debugging log

    // Validate required fields
    const { jobTitle, time, description, companyId } = req.body;

    if (!jobTitle || !jobTitle.trim()) {
      return res.status(400).json({ error: "Job title is required." });
    }
    if (!time) {
      return res.status(400).json({ error: "Job time is required." });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ error: "Job description is required." });
    }
    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required." });
    }

    // Format job data
    const formattedData = {
      jobTitle: jobTitle.trim(),
      pay: req.body.pay ? Number(req.body.pay) : null,
      time,
      skills: req.body.skills ? req.body.skills.map(skill => skill.trim()).filter(Boolean) : [],
      description: description.trim(),
      companyId
    };

    console.log("🔹 Formatted job data:", formattedData); // Debugging log

    // Create & save job
    const newJob = new Job(formattedData);
    const savedJob = await newJob.save();

    console.log("✅ Job successfully created:", savedJob); // Debugging log
    res.status(201).json(savedJob);

  } catch (err) {
    console.error("❌ Error creating job:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

module.exports = {
  createJob,
};
