const router = require("express").Router();
const { makePayment, bookShow, getAllBookingByUserID } = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/make-payment", makePayment);
router.post("/book-show", authMiddleware, bookShow);
router.get("/get-all-bookings/:userId", authMiddleware, getAllBookingByUserID);

module.exports = router;
