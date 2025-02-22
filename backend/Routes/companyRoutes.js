const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

// Company Registration
router.post('/register', async (req, res) => {
  try {
    const { companyName, email, password, industry, website } = req.body;

    // Check if company already exists
    let company = await Company.findOne({ email });
    if (company) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    // Create new company
    company = new Company({
      companyName,
      email,
      password,
      industry,
      website
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(password, salt);

    // Save company
    await company.save();

    // Create JWT token
    const payload = {
      company: {
        id: company.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          company: {
            id: company.id,
            companyName: company.companyName,
            email: company.email,
            industry: company.industry,
            website: company.website
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Company Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if company exists
    let company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      company: {
        id: company.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          company: {
            id: company.id,
            companyName: company.companyName,
            email: company.email,
            industry: company.industry,
            website: company.website
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
