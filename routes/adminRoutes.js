const express = require("express");
const router = express.Router();
const Admin = require("../controllers/adminController");

// router create admin

router.post("/api/admin", Admin.createAdmin);

// Route to get all admins

//router.get("/api/admin", Admin.getAllDetails);

// Route to get a specific admin by ID
router.get("/api/admin/:id", Admin.getAdminById);

// Route to update an admin by ID
router.put("/api/admin/:id", Admin.updateAdminById);
// Route to delete an admin by ID
router.delete("/api/admin/:id", Admin.deleteAdminById);
// Route to handle login
router.post("/api/admin/login", Admin.login);

module.exports = router;
