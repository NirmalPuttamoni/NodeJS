const router = require("express").Router();
const { deleteShow, addShow, updateShow, getAllShowsByTheatreId, getAllTheatressByMovie, getShowById } = require("../controllers/showController");

router.post("/add-show", addShow);
router.delete("/delete-show/:id", deleteShow);
router.put("/update-show/:id", updateShow);
router.get("/get-all-shows-by-theatre/:id", getAllShowsByTheatreId);
router.get("/get-all-theatres-by-movie/:movie/:date", getAllTheatressByMovie);
router.get("/get-show-by-id/:id", getShowById);

module.exports = router;