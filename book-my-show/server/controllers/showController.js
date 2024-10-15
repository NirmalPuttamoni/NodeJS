const mongoose = require("mongoose");
const Show = require("../models/showModel");

const addShow = async (req, res) => {
  try {
    const newShow = await new Show(req.body).save();
    if (newShow) {
      res.send({ success: true, message: `New show ${newShow.name} added` });
    } else {
      res.send({ success: false, message: "Failed to add show" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

const deleteShow = async (req, res) => {
  const id = req?.params?.id;
  try {
    const deletedShow = await Show.findByIdAndDelete(id);
    if (deletedShow) {
      res.send({ success: true, message: `Show ${deletedShow?.name} deleted` });
    } else {
      res.send({ success: false, message: "Failed to delete show" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

const updateShow = async (req, res) => {
  const id = req?.params?.id;
  // console.log("id", id);
  // console.log("body", req.body);
  try {
    if (!id || !mongoose.isValidObjectId(id)) {
      return res
        .status(404)
        .send({ success: false, message: "Id is not valid" });
    }
    const updatedShow = await Show.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedShow) {
      res.send({ success: true, message: `Show ${updatedShow?.name} updated` });
    } else {
      res.send({ success: false, message: "Failed to update show" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

/**
 * get shows 2 APIS
 * 1. get all shows by theatres - will be used by Partners to see the current shows for their theatres
 * 2. get all shows by movie and date [{movieId: 123, date:, }]
 */

const getAllShowsByTheatreId = async (req, res) => {
  // console.log(req.params)
  try {
    const shows = await Show.find({ theatre: req.params.id }).populate("movie");
    if (shows.length === 0) {
      return res.send({ success: true, message: "No shows found", data: [] });
    }
    res.send({ message: "Shows fetched", success: true, data: shows });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message, success: false });
  }
};

const getAllTheatressByMovie = async (req, res) => {
  try {
    const { movie, date } = req?.params;
    const shows = await Show.find({ movie, date }).populate("theatre");

    // const uniqueTheatres = await Show.aggregate([
    //   // Unwind the 'theatre' field to create a document for each show
    //   { $unwind: "$theatre" },
    //   // Group the shows by the theatre '_id'
    //   {
    //     $group: {
    //       _id: "$theatre._id",
    //       theatre: { $first: "$theatre" },
    //       shows: { $push: "$ROOT" },
    //     },
    //   },
    //   // Project the desired fields
    //   {
    //     $project: {
    //       _id: "$_id",
    //       name: "$theatre.name",
    //       address: "$theatre.address",
    //       shows: "$shows",
    //     },
    //   },
    // ]);

    // filter out the unique theatres
    const uniqueTheatres = []; // [{A:{9pm , 11 PM}}, {B:{9pm}}]
    shows?.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );
      if (!isTheatre) {
        // add the theatre along with the all shows
        const showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    // console.log("uniqueTheatres", uniqueTheatres)
    res.send({
      message: "Theatres found",
      success: true,
      data: uniqueTheatres,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message, success: false });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req?.params?.id)
      .populate("movie")
      .populate("theatre");
    if (!show) {
      return res.send({ success: true, message: "No show found", data: [] });
    }
    res.send({ success: true, message: "Show found", data: show });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatreId,
  getAllTheatressByMovie,
  getShowById,
};
