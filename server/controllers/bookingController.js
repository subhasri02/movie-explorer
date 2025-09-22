
import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { name, movieTitle, seats, date, time, email } = req.body;

    const seatsNum = Number(seats) || 1;
    const ticketsNum = seatsNum; 

    const newBooking = new Booking({
      name,
      movieTitle,
      seats: seatsNum,
      tickets: ticketsNum,
      date,
      time,
      email
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Booking creation failed", error: err });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
};

// Get booking stats
export const getStats = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalTickets: { $sum: { $ifNull: ["$seats", 0] } },
          totalRevenue: { $sum: { $ifNull: ["$price", 0] } },
        },
      },
    ]);

    res.json(result[0] || { totalBookings: 0, totalTickets: 0, totalRevenue: 0 });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

