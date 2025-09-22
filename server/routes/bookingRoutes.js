
import express from "express";
import { createBooking, getBookings, getStats, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

// Create booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getBookings);

// Get stats
router.get("/stats", getStats);

// Delete booking
router.delete("/:id", deleteBooking);

export default router;
