const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    
    jobTitle: { type: String, required: true,},
    pay: { type: Number, required: false }, 
    time :{type: Date, required:true },
    skills: { type: [String], required: false },
    description :{type: String, required: true},
    status: { type: String, enum: ["available", "process", "completed", "expired"], default: "available" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Freelancer" }]
}, { timestamps: true } 
);

module.exports = mongoose.model("Job", JobSchema);
