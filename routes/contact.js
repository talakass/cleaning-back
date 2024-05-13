const express = require("express");
const router = express.Router();
const contact = require("../controllers/contact");

router.post("/api/contact/add", contact.addMessage);
router.get("/api/contact/getMessages", contact.getMessages);
router.delete("/api/contact/deleteMessages/:id", contact.deleteMessages);
module.exports = router;