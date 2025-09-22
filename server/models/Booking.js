

import mongoose from "mongoose";

const TICKET_PRICE = 100; 

const bookingSchema = new mongoose.Schema({

  name: { type: String, required: true },
  movieTitle: { type: String, required: true },
  tickets: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number },
  date: { type: String, required: true },
  time: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });


bookingSchema.pre("save", function(next) {
  this.price = this.tickets * TICKET_PRICE;
  next();
});

export default mongoose.model("Booking", bookingSchema);
