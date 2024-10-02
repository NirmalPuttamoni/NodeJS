const router = require("express").Router();
const {
  addTheatre,
  updateTheatre,
  deleteTheatreById,
  getAllTheatres,
  getAllTheatresForOwner,
} = require("../controllers/theatreController");

router.post("/add-theatre", addTheatre);

router.put("/update-theatre", updateTheatre);

router.delete("/delete-theatre/:theatreId", deleteTheatreById);

// get all theatres for Admin route
router.get("/get-all-theatres", getAllTheatres);

// get all theatres for a specific owner
router.get("/get-all-theatres-by-owner/:ownerId", getAllTheatresForOwner);

module.exports = router;
