const CatchAsyncError = require("../middleware/catchAsyncError");
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
      message: "Course created successfully",
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

module.exports = {
  createCourse,
  updateCourse,
};
