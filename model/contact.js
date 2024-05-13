const mongoose = require("mongoose");
const validator = require("validator");

const dataSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", dataSchema);
module.exports = Contact;
