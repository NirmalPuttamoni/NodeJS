const mongoose = require("mongoose");
const Theatre = require("../models/theatreModel");

const addTheatre = async (req, res) => {
  // console.log("req.body", req.body)
  try {
    const newTheatre = await new Theatre(req.body).save();

    if (newTheatre) {
      res.send({
        success: true,
        message: `New  Theatre ${newTheatre.name} has been added`,
      });
    } else {
      res.status(400).send({ success: false, message: "Theatre not added" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const updateTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(
      req.body.theatreId,
      req.body,
      { new: true }
    );
    if (!theatre) {
      return res
        .status(404)
        .send({
          success: false,
          message: `Theatre  ${theatre.name} not found`,
        });
    } else {
      res.send({ success: true, message: `Theatre ${theatre.name} updated` });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const deleteTheatreById = async (req, res) => {
  try {
    // console.log("deleting theatre", req.params.theatreId);
    await Theatre.findByIdAndDelete(req.params.theatreId);
    res.send({ success: true, message: "Theatre deleted" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      data: theatres,
      message: "All theatres fetched",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getAllTheatresForOwner = async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.params.ownerId });
    // console.log("============================getAllTheatres===========================")
    // console.log("id", req.params.ownerId)
    // console.log("getAllTheatres", theatres)
    // console.log("=======================================================")
    res.send({
      success: true,
      data: theatres,
      message: "All theatres fetched",
    });
  } catch (error) {
    console.log("error ", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  addTheatre,
  updateTheatre,
  deleteTheatreById,
  getAllTheatres,
  getAllTheatresForOwner,
};
