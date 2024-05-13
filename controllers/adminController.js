const Admin = require("../model/admin");
const Booking = require("../model/booking");
const Customer = require("../model/customer")
const Service = require("../model/cleaningService")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");



// const getAllDetails = async (req, res) => {
//   try {
//     const Bookings = await Booking.find().sort({ _id: -1 });
//     const Customers = await Customer.find().sort({ _id: -1 });
//     const Services = await Service.find().sort({ _id: -1 });


//     const responseData = {
//       customername: Customers.map(customer => customer.name),
//       customeremail: Customers.map(customer => customer.email),
//       serviceid: Services.map(service => service._id),
//       servicetitle: Services.map(service => service.title),
//       booking:{
//       bookingDate: Bookings.map(booking => booking.bookingDate),
//       bookingstatus: Bookings.map(booking => booking.status),
//       }
//     };
//     res.status(200).json(responseData);
//   } catch (error) {
//     res.status(500).json({ error: "Error getting information" });
//   }
//}




const createTokens = (user) => {
  const accessToken = sign(
    { id: user._id, status: "customer" },
    process.env.JWT_SECRET_KEY
  );
  return accessToken;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    // Check if admin exists and password is correct
    if (!admin || !admin.isValidPassword(password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

// Create a new admin

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });
    const savedAdmin = await newAdmin.save();
    const accessToken = createTokens(savedAdmin);
    res.status(200).json({
      msg: "Admin enter successfully",
      data: savedAdmin,
      token: accessToken,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Error creating admin" });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error getting admins:", error);
    res.status(500).json({ error: "Error getting admins" });
  }
};

// Get a specific admin by ID
const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.status(200).json(admin);
    }
  } catch (error) {
    console.error("Error getting admin:", error);
    res.status(500).json({ error: "Error getting admin" });
  }
};

// Update an admin by ID
const updateAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { name, email, password } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email, password },
      { new: true }
    );

    if (!updatedAdmin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.status(200).json(updatedAdmin);
    }
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "Error updating admin" });
  }
};

// Delete an admin by ID
const deleteAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.status(200).json(deletedAdmin);
    }
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "Error deleting admin" });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  login,
 
};
