const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  projectType: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  budget: {
    type: String
  },
  timeline: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);