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
    const courseId = req.params.courseId;
    const programId = req.params.programId;
    const data = req.body;

    console.log(req.params);

    console.log(data);

    let curriculum;

    if (data?.description != null) {
      // Update the description
      curriculum = await Curriculum.findOne({
        _id: programId,
        course: courseId,
      });
      curriculum.description.push(data.description);
      await curriculum.save();
    } else {
      // Update other fields
      curriculum = await Curriculum.findOneAndUpdate(
        {
          _id: programId,
          course: courseId,
        },
        { $set: data },
        { new: true, lean: true }
      );
    }

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum details not found",
      });
    }

    // Respond with success message and updated curriculum
    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      curriculum,
    });
  } catch (error) {
    console.error("Error in updateProgram:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getProgramById = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const programId = req.params.programId;

    const program = await Curriculum.findOne({
      course: courseId,
      _id: programId,
    });

    console.log(program);

    if (!program) {
      return next(new ErrorHandler("Program not found", 400));
    }
    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      program,
    });
  } catch (error) {
    console.error("Error in updateCurriculumDetails:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const publishProgram = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const programId = req.params.programId;

    const program = await Curriculum.findOneAndUpdate(
      {
        course: courseId,
        _id: programId,
      },
      { $set: { isPublished: true } }, // Use { isPublished: true } directly
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Program published", data: program });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const unpublishProgram = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const programId = req.params.programId;

    const program = await Curriculum.findOneAndUpdate(
      {
        course: courseId,
        _id: programId,
      },
      { $set: { isPublished: false } },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Program unpublished", data: program });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteProgram = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const programId = req.params.programId;

    const deletedProgram = await Curriculum.findOneAndDelete({
      course: courseId,
      _id: programId,
    });

    if (!deletedProgram) {
      return next(new ErrorHandler("Program not found", 404));
    }

    console.log(`Deleted program: ${deletedProgram}`);
    res
      .status(200)
      .json({ success: true, message: "Program deleted", data: {} });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createProgram,
  updateProgram,
  getProgramById,
  publishProgram,
  unpublishProgram,
  deleteProgram,
};
