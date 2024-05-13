const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'CleaningService' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },
  status: { type: String, match: /^(valid|pending|canceled)$/ },
  totalAmount: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
