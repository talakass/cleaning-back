const express = require("express");
const router = express.Router();
const Customer = require("../controllers/customerController");

// router create customer

router.post("/api/customer", Customer.createCustomer);

// Route to get all customers

router.get("/api/customer", Customer.getAllCustomers);

// Route to get a specific customer by ID
router.get("/api/customer/:id", Customer.getCustomerById);

// Route to update an customer by ID
router.put("/api/customer/:id", Customer.updateCustomerById);

// Route to delete an customer by ID
router.delete("/api/customer/:id", Customer.deleteCustomerById);


router.post("/api/customer/login", Customer.LoginCustomer);



module.exports = router;
