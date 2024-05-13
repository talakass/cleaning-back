const Booking = require('../model/booking');
const Customer = require("./../model/customer")
// Create a new booking
const createBooking = async (req, res) => {
  const Customeremail = req.params.email;
  const customerId = await Customer.findOne({ email: Customeremail });
  const customertalaid = customerId._id
  try {

    const { serviceId, bookingDate, bookingTime, totalAmount } = req.body;
    const newBooking = new Booking({
      serviceId,
      customerId: customertalaid,
      bookingDate,
      bookingTime,
      status: "valid",
      totalAmount,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
};

// Get all bookings

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('serviceId')
      .populate('customerId');

    const bookingsWithCustomerName = bookings.map(booking => {
      if(booking.customerId){
        const { serviceName } = booking.serviceId;
      const {customerName} = booking.customerId ;
      return { ...booking._doc, serviceName, customerName };
      }
      
    });

    res.status(200).json(bookingsWithCustomerName);
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ error: 'Error getting bookings' });
  }
};

// Get a specific booking by ID
const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({ error: 'Error getting booking' });
  }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { serviceId, customerId, bookingDate, bookingTime, status, totalAmount } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { serviceId, customerId, bookingDate, bookingTime, status, totalAmount },
      { new: true }
    );

    if (!updatedBooking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.status(200).json(updatedBooking);
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Error updating booking' });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.status(200).json(deletedBooking);
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Error deleting booking' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
