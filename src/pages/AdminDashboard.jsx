

import { useEffect, useState } from "react";
import { getBookings, deleteBooking, getStats } from "../services/bookingService";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ totalBookings: 0, totalTickets: 0, totalRevenue: 0 });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    loadBookings();
    loadStats();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error("❌ Error loading bookings:", err);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getStats();
      console.log("✅ Stats fetched:", data);
      setStats(data);
    } catch (err) {
      console.error("❌ Error loading stats:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this booking?")) {
      try {
        await deleteBooking(id);
        loadBookings();
        loadStats();
      } catch (err) {
        console.error("❌ Error deleting booking:", err);
      }
    }
  };

  // Filtering & Pagination 
  const filteredBookings = bookings.filter((b) =>
    b.movieTitle?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-400">
        🎬 Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
          <h3 className="text-gray-700 dark:text-gray-300">Total Bookings</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.totalBookings}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
          <h3 className="text-gray-700 dark:text-gray-300">Total Tickets</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.totalTickets}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg text-center">
          <h3 className="text-gray-700 dark:text-gray-300">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {currencyFormatter.format(stats.totalRevenue)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by movie name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-80 px-4 py-2 rounded-lg border shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700"
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
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {currentBookings.length > 0 ? (
              currentBookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{b.name}</td>
                  <td className="px-6 py-4">{b.movieTitle}</td>
                  <td className="px-6 py-4">{b.seats}</td>
                  <td className="px-6 py-4">{b.date}</td>
                  <td className="px-6 py-4">{b.time}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-600 dark:text-gray-300">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 text-gray-900 dark:text-white">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-purple-500 text-white disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
