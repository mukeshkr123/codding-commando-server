const CatchAsyncError = require("../middleware/catchAsyncError");
const { createCourseService } = require("../services/course-service");
const ErrorHandler = require("../utils/ErrorHandler");

const createCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const response = await createCourseService(req.body);
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: response,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createCourse,
};
