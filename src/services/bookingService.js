
import { db } from "../auth/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const BOOKINGS_COLLECTION = "bookings";

// Save booking
export const addBooking = async (booking) => {
  try {
    await addDoc(collection(db, BOOKINGS_COLLECTION), booking);
    return true;
  } catch (err) {
    console.error("Error adding booking:", err);
    throw err;
  }
};

// Get all bookings
export const getBookings = async () => {
  try {
    const snapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return [];
  }
};
