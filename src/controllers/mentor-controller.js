const CatchAsyncError = require("../middleware/catchAsyncError");
const Mentor = require("../models/mentors.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const name = req.body.name;

    if (!name) {
      throw new Error("Please provide a name");
    }

    // create the mentor
    const mentor = await Mentor.create({ name });

    return res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      mentor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getMentorsById = CatchAsyncError(async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;

    const mentor = await Mentor.findById({ _id: mentorId });

    return res.status(200).json({
      status: true,
      message: "Fetched sucessfully",
      mentor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;
    const data = req.body;

    const mentor = await Mentor.findByIdAndUpdate(
      { _id: mentorId },
      { $set: data },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      mentor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllMentors = CatchAsyncError(async (req, res, next) => {
  try {
    const mentors = await Mentor.find();

    return res.status(200).json({
      success: true,
      message: "fetched successfully",
      mentors,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createMentor,
  getMentorsById,
  updateMentor,
  getAllMentors,
};
