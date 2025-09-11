// admin page to view all bookings

import React, { useEffect, useState } from "react";
import { db } from "../auth/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  // ✅ Currency formatter (India locale with INR)
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // removes listener when component unMounts
  }, []);

  // ✅ Add totalAmount field to each booking
  const bookingsWithAmount = bookings.map((b) => ({
    ...b,
    ticketPrice: b.ticketPrice || 100, // change to 100 INR default
    totalAmount: b.seats * (b.ticketPrice || 100),
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        All Bookings
      </h2>

      <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              Name
            </th>
            <th className="px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              Email
            </th>
            <th className="px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              Movie
            </th>
            <th className="px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              Tickets
            </th>
            <th className="px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              Price per Ticket
            </th>
            <th className="px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              Total Amount
            </th>
            <th className="px-4 py-2 text-left bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              Booking Time
            </th>
          </tr>
        </thead>

        <tbody>
          {bookingsWithAmount.map((booking, index) => (
            <tr
              key={booking.id}
              className={`${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-gray-800"
                  : "bg-white dark:bg-gray-900"
              }`}
            >
              <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                {booking.userName || "N/A"}
              </td>
              <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                {booking.userEmail}
              </td>
              <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                {booking.movieTitle}
              </td>
              <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                {booking.seats}
              </td>
              <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                {currencyFormatter.format(booking.ticketPrice)}
              </td>
              <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                {currencyFormatter.format(booking.totalAmount)}
              </td>
              <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                {booking.date?.toDate().toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        {/* ✅ Total Revenue Row */}
        <tfoot>
          <tr>
            <td
              colSpan="5"
              className="px-4 py-2 font-bold text-right bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              Total Revenue
            </td>
            <td
              colSpan="2"
              className="px-4 py-2 font-bold bg-gray-200 dark:bg-gray-700 text-green-600 dark:text-green-400"
            >
              {currencyFormatter.format(
                bookingsWithAmount.reduce((acc, b) => acc + b.totalAmount, 0)
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdminDashboard;
