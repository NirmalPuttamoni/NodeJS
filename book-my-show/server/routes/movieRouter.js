const express = require("express");
const movieRouter = express.Router();
const Movies = require("../models/movieModel")
const { addMovie, getAllMovies, updateMovie, deleteMovie, getMovieById } = require("../controllers/movieController");

// get all movies
movieRouter.get("/get-all-movies", getAllMovies);

// add a movie
movieRouter.post("/add-movie", addMovie);

// update a movie
movieRouter.put("/update-movie", updateMovie);

// delete a movie
movieRouter.delete("/delete-movie", deleteMovie);

// get movie by id
movieRouter.get("/get-movie/:id", getMovieById);

module.exports = movieRouter;