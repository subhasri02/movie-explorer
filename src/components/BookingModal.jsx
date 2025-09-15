


import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../auth/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const timeSlots = [
  "10:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
  "08:00 PM",
  "10:00 PM",
];

const BookingModal = ({ movie, onClose }) => {
  const { user } = useAuth();
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!movie) return null;

  const handleBook = async () => {
    if (!user) return alert("⚠️ Please login to book tickets!");
    if (seats < 1 || seats > 5) return alert("You can only book 1–5 tickets.");
    if (!date || !time) return alert("Please select a date and time!");

    const bookingData = {
      movieTitle: movie.title,
      userEmail: user.email,
      userName: user.displayName || "Guest",
      seats,
      date,
      time,
      createdAt: serverTimestamp(),
    };

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      setSuccessData({ id: docRef.id, ...bookingData });

      setTimeout(() => {
        onClose();
      }, 3000);
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-96 text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 Booking Successful!
          </h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-left shadow-inner">
            <p className="mb-2">
              <span className="font-semibold">🎬 Movie:</span> {successData.movieTitle}
            </p>
            <p className="mb-2">
              <span className="font-semibold">🎟 Seats:</span> {successData.seats}
            </p>
            <p className="mb-2">
              <span className="font-semibold">👤 User:</span> {successData.userEmail}
            </p>
            <p className="mb-2">
              <span className="font-semibold">🗓 Date:</span> {successData.date}
            </p>
            <p className="mb-2">
              <span className="font-semibold">⏰ Time:</span> {successData.time}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-80 animate-fade-in">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          Book {movie.title}
        </h2>

        {/* Seats*/ }
        <label className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Seats:
        </label>
        <input
          type="number"
          min="1"
          max="5"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="border dark:border-gray-600 p-2 w-full rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 transition duration-300 hover:ring-green-400"
        />

        {/* Date Picker */}
        <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white">
          Date:
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border dark:border-gray-600 p-2 w-full rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 transition duration-300 hover:ring-green-400 cursor-pointer"
          min={new Date().toISOString().split("T")[0]} // prevent past dates
        />

        {/* Time Slots Dropdown */}
        <label className="block mt-3 text-sm font-medium text-gray-900 dark:text-white">
          Time:
        </label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border dark:border-gray-600 p-2 w-full rounded-lg mt-1 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 transition duration-300 hover:ring-green-400 cursor-pointer"
        >
          <option value="">Select time</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        {/* Buttons*/ }
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={handleBook}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow transition transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

