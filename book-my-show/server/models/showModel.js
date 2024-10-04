const mongoose = require("mongoose");

/**
 * showSchema: Schema to store show details
 * time, movie, date, seats, price, booked seats
 */

const showSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    ticketPrice: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatres",
      required: true,
    },
    bookedSeats: {type: Array, default: []}
  },
  { timestamps: true }
);

const Show = mongoose.model("shows", showSchema);

module.exports = Show;
