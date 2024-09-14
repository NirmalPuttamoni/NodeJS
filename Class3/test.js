const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

/** Do not change the connection string below */
mongoose.connect("mongodb://localhost:27017/myApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
/** connection ends */

const Movie = mongoose.model(
    "Movie",
    new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        genre: { type: String, required: true },
        language: { type: String, required: true },
        releaseDate: { type: Date, required: true },
        poster: { type: String, required: true },
    })
);

// Your code goes here.
app.post("/movies", async (req, res) => {
    try {
        const body = req.body;
        console.log(req)
        const newMovie = await Movie.create({
            title: body.title,
            description: body.description,
            duration: body.duration,
            genre: body.genre,
            language: body.language,
            releaseDate: body.releaseDate,
            poster: body.poster
        });
        return res.json(req);
    } catch (error) {
        return res.status(500).json("Internal Server Error")
    }
})


module.exports = { app, Movie };

app.listen(3000, ()=>{
    console.log("Server started at port 3000")
})