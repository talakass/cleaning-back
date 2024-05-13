const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Customer = require("../model/customer");
const Admin = require("../model/admin");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    // Check if user with the same email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newCustomer = new Customer({ name, email, password: hashedPassword });
    await newCustomer.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "sccccdcdcdcdcdcddcdcd" });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT
    const token = jwt.sign({ customerId: customer._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "your-secret-key", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res
      .status(200)
      .json({ message: "Token is valid", customerId: decodedToken.customerId });
  });
};

//same thing for the Admin

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if Admin with the same email already exists
    const existingAdmin = await Customer.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the Admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the Admin by email
    const Admin = await Admin.findOne({ email });
    if (!Admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, Admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT
    const token = jwt.sign({ AdminId: Admin._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "your-secret-key", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res
      .status(200)
      .json({ message: "Token is valid", AdminId: decodedToken.AdminId });
  });
};
