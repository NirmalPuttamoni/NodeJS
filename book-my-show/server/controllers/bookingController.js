const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const EmailHelper = require("../utils/emailHelper");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const makePayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the user",
      confirm: true,
    });
    const transactionId = paymentIntent.id;

    res.send({
      success: true,
      data: transactionId,
      message:
        "Payment processing. You will receive a confirmation email shortly.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const bookShow = async (req, res) => {
  // console.log(req.body)
  try {
    const newBooking = await new Booking(req.body).save();
    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });
    // add more details for booking
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          module: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          module: "theatres",
        },
      });
    await EmailHelper("ticket.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.title,
      poster: populatedBooking.show.movie.poster,
      theatre: populatedBooking.show.theatre.name,
      time: populatedBooking.show.time,
      date: populatedBooking.show.date,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    });
    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBookingByUserID = async (req, res) => {
  // console.log(req.params.userId)
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    // booking ->  show -> movie
    // booking ->  show -> theatre
    // console.log("bookings", bookings)
    if (bookings.length > 0) {
      res.send({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } else {
      res.send({
        success: false,
        message: "No Bookings to fetch",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {makePayment, getAllBookingByUserID, bookShow}