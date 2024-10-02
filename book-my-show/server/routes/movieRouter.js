const express = require("express");
const movieRouter = express.Router();
const Movies = require("../models/movieModel")
const { addMovie, getAllMovies, updateMovie, deleteMovie } = require("../controllers/movieController");

const auth = (req, res, next) => {
    console.log(" auth ");
    next();
}

//add a movie
movieRouter.get("/get-all-movies", auth, getAllMovies);

//add a movie
movieRouter.post("/add-movie", auth, addMovie);

// update a movie
movieRouter.put("/update-movie", updateMovie);

// update a movie
movieRouter.delete("/delete-movie", deleteMovie);


module.exports = movieRouter;