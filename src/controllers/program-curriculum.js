const CatchAsyncError = require("../middleware/catchAsyncError");
const Course = require("../models/course.model");
const Curriculum = require("../models/program.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createProgram = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    console.log(courseId);

    const program = await Curriculum.create({
      course: courseId,
      title: req.body.title,
    });

    const course = await Course.findById(courseId);

    console.log(course);

    if (course) {
      course.program_curriculum.push(program._id);
      await course.save();
    }

    console.log(course);

    return res.status(201).json({
      success: true,
      message: "Program created successfully",
      program,
    });
  } catch (error) {
    console.error("Error in createProgramCurriculum:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateProgram = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const data = req.body;

    console.log(courseId);

    const curriculum = await Curriculum.findOneAndUpdate(
      { course: courseId },
      { $set: data },
      { new: true, lean: true }
    );

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      curriculum,
    });
  } catch (error) {
    console.error("Error in updateCurriculumDetails:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createProgram,
  updateProgram,
};
