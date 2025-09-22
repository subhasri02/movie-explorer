

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createBooking } from "../services/bookingService";

const timeSlots = ["10:00 AM","12:00 PM","02:00 PM","04:00 PM","06:00 PM","08:00 PM","10:00 PM"];

const BookingModal = ({ movie, onClose }) => {
  const { user } = useAuth();
  const [seats, setSeats] = useState(0);
  //const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  if (!movie) return null;

  const handleBook = async () => {
    if (!user) return alert("⚠️ Please login to book tickets!");
    if (seats < 1 || seats > 5) return alert("You can only book 1–5 tickets.");
    if (!date || !time) return alert("Please select a date and time!");

    const bookingData = {
      movieId: movie._id || null,
      movieTitle: movie.title,
      email: user.email,
      name: user.name,
      seats: Number(seats),
      date,
      time,
    };

    try {
      setLoading(true);
      const savedBooking = await createBooking(bookingData);
      setSuccessData(savedBooking);

      setTimeout(() => onClose(), 3000);
    } catch (error) {
      console.error("❌ Booking failed:", error);
      alert("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  if (successData) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-96 text-center">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
          🎉 Booking Successful!
        </h2>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-left shadow-inner">
          <p className="text-gray-900 dark:text-gray-100">🎬 Movie: {successData.movieTitle}</p>
          <p className="text-gray-900 dark:text-gray-100">🎟 Seats: {successData.seats}</p>
          <p className="text-gray-900 dark:text-gray-100">👤 User: {successData.email}</p>
          <p className="text-gray-900 dark:text-gray-100">🗓 Date: {successData.date}</p>
          <p className="text-gray-900 dark:text-gray-100">⏰ Time: {successData.time}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
  }

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    //   <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-80">
    //     <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Book {movie.title}</h2>
    //     <label className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Seats:</label>
    //     <input type="number" min="1" max="5" value={seats} onChange={(e) => setSeats(Number(e.target.value))} className="border p-2 w-full rounded-lg mt-1 dark:bg-gray-700 dark:text-white" />

    //     <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
    //     <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 w-full rounded-lg mt-1 dark:bg-gray-700 dark:text-white" min={new Date().toISOString().split("T")[0]} />

    //     <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white">Time:</label>
    //     <select value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 w-full rounded-lg mt-1 dark:bg-gray-700 dark:text-white">
    //       <option value="">Select time</option>
    //       {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
    //     </select>

    //     <div className="mt-4 flex justify-end gap-3">
    //       <button onClick={handleBook} disabled={loading} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">{loading ? "Booking..." : "Confirm"}</button>
    //       <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Cancel</button>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-80">
    <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Book {movie.title}</h2>

    <label className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Seats:</label>
    <input
      type="number"
      min="1"
      max="5"
      value={seats}
      onChange={(e) => setSeats(Number(e.target.value))}
      className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg mt-1 
                 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
    />

    <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      min={new Date().toISOString().split('T')[0]}
      className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg mt-1 
                 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
    />

    <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white">Time:</label>
    <select
      value={time}
      onChange={(e) => setTime(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded-lg mt-1 
                 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
    >
      <option value="">Select time</option>
      {timeSlots.map((slot) => (
        <option key={slot} value={slot}>
          {slot}
        </option>
      ))}
    </select>

    <div className="mt-4 flex justify-end gap-3">
      <button
        onClick={handleBook}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Booking...' : 'Confirm'}
      </button>
      <button
        onClick={onClose}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Cancel
      </button>
    </div>
  </div>
</div>

  );
};

export default BookingModal;
