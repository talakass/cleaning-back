require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
const bookingRoutes = require("./routes/bookingRoutes");
const adminroute = require("./routes/adminRoutes");
const customerroute = require("./routes/customerRoutes");
const cleaningServiceroute = require("./routes/cleaningServiceRoutes");
// const paymentroute = require("./routes/paymentRoutes");
const Contact = require("./routes/contact");
// const refundroute = require("./routes/refundRoutes");
////const authroute = require("./routes/authRoutes");

// Import and use the Routes

app.use(cors());
app.use("/", bookingRoutes);
app.use("/", adminroute);
app.use("/", customerroute);
app.use("/", cleaningServiceroute);
// app.use("/", paymentroute);
// app.use("/", refundroute);
app.use("/", Contact);


// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
