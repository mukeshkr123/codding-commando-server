const CatchAsyncError = require("../middleware/catchAsyncError");
const Course = require("../models/course.model");
const { Curriculum, ProgramDesc } = require("../models/program.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createProgram = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    // Create a new curriculum for the given course
    const program = await Curriculum.create({
      course: courseId,
      title: req.body.title,
    });

    // Find the course by its ID
    const course = await Course.findById(courseId);

    if (course) {
      // Add the program to the course's curriculum
      course.program_curriculum.push(program._id);
      await course.save();
    }

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

    let curriculum;

    if (data?.description != null) {
      // If description data is provided, create a new description and add it to the curriculum
      curriculum = await Curriculum.findOne({
        _id: programId,
        course: courseId,
      });

      const description = await ProgramDesc.create({
        program: programId,
        title: data.description,
      });

      curriculum.description.push(description._id);
      curriculum = await curriculum.save();
    } else {
      // If no description data, update the curriculum with the provided data
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

    // Find the program by its ID and populate the description field
    const program = await Curriculum.findOne({
      course: courseId,
      _id: programId,
    }).populate("description");

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

    // Publish the program by updating the 'isPublished' field to true
    const program = await Curriculum.findOneAndUpdate(
      {
        course: courseId,
        _id: programId,
      },
      { $set: { isPublished: true } },
      { new: true }
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

    // Unpublish the program by updating the 'isPublished' field to false
    const program = await Curriculum.findOneAndUpdate(
      {
        course: courseId,
        _id: programId,
      },
      { $set: { isPublished: false } },
      { new: true }
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

    // Delete the program by its ID and course ID
    const deletedProgram = await Curriculum.findOneAndDelete({
      course: courseId,
      _id: programId,
    });

    if (!deletedProgram) {
      return next(new ErrorHandler("Program not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Program deleted", data: {} });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteProgramDescription = CatchAsyncError(async (req, res, next) => {
  try {
    const { programId, courseId, descriptionId } = req.params;

    // Find the program by its ID and course ID
    const program = await Curriculum.findOne({
      _id: programId,
      course: courseId,
    });

    if (!program) {
      throw new Error("Program not found");
    }

    // Delete the description by its ID and program ID
    const description = await ProgramDesc.findOneAndDelete({
      program: programId,
      _id: descriptionId,
    });

    if (!description) {
      throw new Error("Description not found");
    }

    // Remove the description from the program's description array
    program.description.pull(description._id);
    await program.save();

    return res.status(200).json({
      success: true,
      message: "Description deleted",
    });
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
  deleteProgramDescription,
};
