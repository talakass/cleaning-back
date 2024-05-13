const express = require("express");
const router = express.Router();
const Booking = require("../controllers/bookingController");

// router create booking

router.post("/api/booking/:email", Booking.createBooking);

// Route to get all bookings

router.get("/api/booking", Booking.getAllBookings);

// Route to get a specific booking by ID
router.get("/api/booking/:id", Booking.getBookingById);

// Route to update a Booking by ID
router.put("/api/booking/:id", Booking.updateBookingById);

// Route to delete a booking by ID
router.delete("/api/booking/:id", Booking.deleteBookingById);

module.exports = router;
