const Movies = require("../models/movieModel");

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movies.find();
    if (allMovies) {
      res.send({
        success: true,
        message: "All Movies Fetched",
        data: allMovies,
      });
    } else {
      res.send({
        success: false,
        message: "No Movies to fetch",
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const addMovie = async (req, res) => {
  try {
    const newMovie = new Movies(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: `New Movie ${newMovie.title} has been added`,
    });
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const updateMovie = async (req, res) => {
  try {
    // console.log(req.body)
    const updatedMovie = await Movies.findByIdAndUpdate(
      req.body.movieId,
      req.body,
      { new: true }
    );
    if (updatedMovie) {
      res.send({
        success: true,
        message: `Movie ${updateMovie.title} has been updated`,
      });
    } else {
      res.send({
        success: false,
        message: `Movie ${req.body.title} doesn't exist`,
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const deleteMovie = async (req, res) => {
  // console.log("req body", req.body);
  try {
    const deletedMovie = await Movies.findByIdAndDelete(req.body.movieId);
    if (deletedMovie) {
      res.send({
        success: true,
        message: `Movie ${deletedMovie.title} has been deleted`,
      });
    } else {
      res.send({
        success: false,
        message: `Movie ${deletedMovie.title} doesn't exist`,
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movies.findById(req?.params?.id);
    if (movie) {
      res.send({
        success: true,
        message: "All Movies Fetched",
        data: movie,
      });
    } else {
      res.send({
        success: false,
        message: "No Movies to fetch",
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message, success: false });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
};
