const CatchAsyncError = require("../middleware/catchAsyncError");
const Course = require("../models/course.model");
const {
  createCourseService,
  updateCourseService,
} = require("../services/course-service");
const ErrorHandler = require("../utils/ErrorHandler");

const createCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const response = await createCourseService(req?.user, req.body);
    return res.status(201).json({
      success: true,
      message: "Course created ",
      course: response,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const response = await updateCourseService(
      req.params.id,
      req?.user,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: response,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getCourseBycourseId = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req?.user._id;
    const course = await Course.findOne({ _id: courseId, userId })
      .populate("program_curriculum")
      .populate("strategy");

    if (!course) {
      throw next(new ErrorHandler("Course not found", 404));
    }

    return res.status(200).json({
      status: true,
      message: "Course data fetched successfully",
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error?.message, 400));
  }
});

// get All course by user
const getAllCourses = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      throw next(new ErrorHandler(" Unuthorized", 400));
    }

    const courses = await Course.find({ userId }).sort({ createdAt: "desc" });

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createCourse,
  updateCourse,
  getCourseBycourseId,
  getAllCourses,
};
