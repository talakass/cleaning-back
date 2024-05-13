const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cleaningid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CleaningService' }]
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
