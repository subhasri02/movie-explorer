

import React, { useEffect, useState } from "react";
import { db } from "../auth/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  // Fetch bookings from Firestore
  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    });
    return () => unsubscribe();
  }, []);

  // Safe date formatter
  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      if (date.toDate) return date.toDate().toLocaleString(); // Firestore Timestamp
      if (date instanceof Date) return date.toLocaleString();
      return new Date(date).toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  const filteredBookings = bookings.filter((b) =>
  b.movieTitle?.toLowerCase().includes(search.toLowerCase())
);


  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  // Summary stats
  const totalBookings = bookings.length;
  const totalSeats = bookings.reduce((acc, b) => {
    if (Array.isArray(b.seats)) return acc + b.seats.length;
    return acc + (b.seats || 1);
  }, 0);
  const totalRevenue = bookings.reduce((acc, b) => {
    const seatsCount = Array.isArray(b.seats) ? b.seats.length : b.seats || 1;
    return acc + seatsCount * (b.ticketPrice || 100);
  }, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-400">
        🎬 Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Bookings
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalBookings}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Tickets
          </h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {totalSeats}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {currencyFormatter.format(totalRevenue)}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by movie name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="w-80 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white dark:bg-gray-800">
        <table className="w-full text-sm text-left">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Movie</th>
              <th className="px-6 py-3">Seats</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">{b.userName || "N/A"}</td>
                  <td className="px-6 py-4 font-semibold text-purple-600 dark:text-purple-400">
                    {b.movieTitle || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {Array.isArray(b.seats) ? b.seats.join(", ") : b.seats || 0}
                  </td>
                  <td className="px-6 py-4">{formatDate(b.createdAt)}</td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    {currencyFormatter.format(
                      (Array.isArray(b.seats) ? b.seats.length : b.seats || 1) *
                        (b.ticketPrice || 100)
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="px-4 py-2 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

