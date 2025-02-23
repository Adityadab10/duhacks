const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Add this new route to get jobs by company ID
router.get('/jobs/company/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    console.log('Received request for company ID:', companyId);
    
    if (!companyId) {
      return res.status(400).json({ message: 'Company ID is required' });
    }

    const jobs = await Job.find({ companyId }).sort({ createdAt: -1 });
    console.log('Found jobs:', jobs);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching company jobs:', error);
    res.status(500).json({ message: 'Error fetching company jobs' });
  }
});

// Create new job
router.post('/jobs', async (req, res) => {
  try {
    console.log('Received job data:', req.body); // Debug log

    const { jobTitle, pay, time, skills, description, companyId } = req.body;

    // Validate required fields
    if (!jobTitle?.trim()) {
      return res.status(400).json({ message: 'Job title is required' });
    }
    if (!time) {
      return res.status(400).json({ message: 'Time is required' });
    }
    if (!description?.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!companyId) {
      return res.status(400).json({ message: 'Company ID is required' });
    }

    const newJob = new Job({
      jobTitle: jobTitle.trim(),
      pay: pay || undefined,
      time: new Date(time),
      skills: skills || [],
      description: description.trim(),
      companyId,
      status: "available"
    });

    console.log('Attempting to save job:', newJob); // Debug log

    const savedJob = await newJob.save();
    console.log('Job created successfully:', savedJob); // Debug log
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ 
      message: 'Error creating job', 
      error: error.message,
      details: error.stack
    });
  }
});

module.exports = router;