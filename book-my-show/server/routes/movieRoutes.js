const express = require("express");
const movieRouter = express.Router();
const Movie = require("../models/movieModel")

//add a movie
movieRouter.post("/add-movie", async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: `New Movie ${newMovie.title} has been added`
        })
    } catch (error) {
        res.status(400).send({ message: error.message, success: false });
    }
});

// update a movie
movieRouter.put("/update-movie", async(req, res)=>{
    try {
        // check if movie exists or not
    } catch (error) {
        res.status(400).send({ message: error.message, success: false });
    }
})

// update a movie
movieRouter.delete("/delete-movie", async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(400).send({ message: error.message, success: false });
    }
})


module.exports = movieRouter;