const CatchAsyncError = require("../middleware/catchAsyncError");
const Course = require("../models/course.model");
const Strategy = require("../models/strategy.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createStrategy = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const strategy = await Strategy.create({
      course: courseId,
      title: req.body.title,
    });

    const course = await Course.findById(courseId);

    if (course) {
      course.strategy.push(strategy._id);
      await course.save();
    }

    return res.status(201).json({
      success: true,
      message: "Strategy created successfully",
      strategy,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateStrategy = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const data = req.body;
    const strategyId = req.params.strategyId;

    mentors(courseId);

    const strategy = await Strategy.findOneAndUpdate(
      { _id: strategyId, course: courseId },
      { $set: data },
      { new: true, lean: true }
    );

    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: "Strategy details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      strategy,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getStrategyById = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const strategyId = req.params.strategyId;

    const strategy = await Strategy.findOne({
      _id: strategyId,
      course: courseId,
    });

    if (!strategy) {
      return next(new ErrorHandler("Strategy not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      strategy,
    });
  } catch (error) {
    console.error("Error in getStrategyById:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const publishStrategy = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const strategyId = req.params.strategyId;

    const strategy = await Strategy.findOneAndUpdate(
      {
        course: courseId,
        _id: strategyId,
      },
      { $set: { isPublished: true } },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Strategy published", data: strategy });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const unpublishStrategy = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const strategyId = req.params.strategyId;

    const strategy = await Strategy.findOneAndUpdate(
      {
        course: courseId,
        _id: strategyId,
      },
      { $set: { isPublished: false } },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Strategy unpublished", data: strategy });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteStrategy = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const strategyId = req.params.strategyId;

    const deletedStrategy = await Strategy.findOneAndDelete({
      course: courseId,
      _id: strategyId,
    });

    if (!deletedStrategy) {
      return next(new ErrorHandler("Strategy not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Strategy deleted", data: {} });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createStrategy,
  updateStrategy,
  getStrategyById,
  publishStrategy,
  unpublishStrategy,
  deleteStrategy,
};
