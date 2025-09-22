
import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

// Create booking
export const createBooking = async (bookingData) => {
  const res = await axios.post(API_URL, bookingData);
  return res.data;
};

// Get all bookings
export const getBookings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Delete booking
export const deleteBooking = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const getStats = async () => {
  const { data } = await axios.get(`${API_URL}/stats`);
  return data;
};
