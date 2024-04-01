const mongoose = require('mongoose');

/**
 * Name (Required)-

Designation (Required) - 

Company (Required) - 

Industry (Not Required)

Email (Required)-

Phone Number (Required)-

Country (Required)
 */
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Contact', contactSchema);