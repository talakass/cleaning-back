const Customer = require("../model/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign({ id: user._id ,status: "customer" }, process.env.JWT_SECRET_KEY);
  return accessToken;
};


const createCustomer = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    const savedCustomer = await newCustomer.save();
    const accessToken = createTokens(savedCustomer);
    res.status(200).json({
      msg: "Client Added Successfully",
      data:savedCustomer,
      token: accessToken,
    });
  }



   catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating customer" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error getting customers:", error);
    res.status(500).json({ error: "Error getting customers" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.status(200).json(customer);
    }
  } catch (error) {
    console.error("Error getting customer:", error);
    res.status(500).json({ error: "Error getting customer" });
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { name, email, password, phoneNumber, address } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, email, password, phoneNumber, address },
      { new: true }
    );

    if (!updatedCustomer) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.status(200).json(updatedCustomer);
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Error updating customer" });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.status(200).json(deletedCustomer);
    }
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Error deleting customer" });
  }
};
const LoginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const customer = await Customer.findOne({ email: email });
    if (!customer) {
      
      return res.status(401).json({ error :{message:"Email Faild"}});
    } else {
      const dbPassword = customer.password;
      bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
          return res.status(400).json({ error :{message:"password faild"}});
        }
        const accessToken = createTokens(customer);
        res.cookie("token", accessToken);
        res.status(200).json({ msg: "You are Logged In", token: accessToken });
      });
    }
  } catch (error) {
        
res.status(500).json({ error: error });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  LoginCustomer,
};
