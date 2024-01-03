const CatchAsyncError = require("../middleware/catchAsyncError");
const Course = require("../models/course.model");
const Mentor = require("../models/mentors.model");
const User = require("../models/user.model");
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
      .populate("strategy")
      .populate("mentors");

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

const assignMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const mentorId = req.body.mentorId;
    const userId = req?.user._id;

    // Assign mentors
    const course = await Course.findOne({ _id: courseId, userId }).catch(
      (err) => {
        throw new Error("Course not found");
      }
    );

    if (!course) {
      throw new Error("Course not found");
    }

    const mentor = await Mentor.findOne({ _id: mentorId }).catch((err) => {
      throw new Error("Mentor not found");
    });

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    // Check if the mentor is already assigned to the course
    if (course.mentors.includes(mentor._id)) {
      throw new Error("Mentor is already assigned");
    }

    // Check if the course is already assigned to the mentor
    if (mentor.courseAssigned.includes(course._id)) {
      throw new Error("Course is already assigned");
    }

    course.mentors.push(mentor._id);
    await course.save().catch((err) => {
      throw new Error("Error saving course");
    });

    mentor.courseAssigned.push(course._id);
    await mentor.save().catch((err) => {
      throw new Error("Error saving mentor");
    });

    return res.status(200).json({
      success: true,
      message: "Course has been assigned",
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const unassignMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const mentorId = req.body.mentorId;
    const userId = req?.user._id;

    // Unassign mentors
    const course = await Course.findOne({ _id: courseId, userId }).catch(
      (err) => {
        throw new Error("Course not found");
      }
    );

    if (!course) {
      throw new Error("Course not found");
    }

    const mentor = await Mentor.findOne({ _id: mentorId }).catch((err) => {
      throw new Error("Mentor not found");
    });

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    // Check if the mentor is assigned to the course
    const mentorIndexInCourse = course.mentors.indexOf(mentor._id);
    if (mentorIndexInCourse === -1) {
      throw new Error("Mentor is not assigned to the course");
    }

    // Check if the course is assigned to the mentor
    const courseIndexInMentor = mentor.courseAssigned.indexOf(course._id);
    if (courseIndexInMentor === -1) {
      throw new Error("Course is not assigned to the mentor");
    }

    // Unassign the mentor from the course
    course.mentors.splice(mentorIndexInCourse, 1);
    await course.save().catch((err) => {
      throw new Error("Error saving course");
    });

    // Unassign the course from the mentor
    mentor.courseAssigned.splice(courseIndexInMentor, 1);
    await mentor.save().catch((err) => {
      throw new Error("Error saving mentor");
    });

    return res.status(200).json({
      success: true,
      message: "Mentor has been unassigned from the course",
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// published
const getAllPublishedCourse = CatchAsyncError(async (req, res, next) => {
  try {
    const courses = await Course.find({
      isPublished: true,
    }).select("title description duration imageUrl");

    return res.status(200).json({
      success: true,
      message: "Published courses fetched",
      courses,
    });
  } catch (error) {
    // Log the error for debugging
    console.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

//public
const getCourseById = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById({ _id: courseId })
      .populate({
        path: "program_curriculum",
        populate: {
          path: "description",
          model: "ProgramDesc",
        },
      })
      .populate("strategy")
      .populate("paymentDetail")
      .populate("mentors");
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched",
      course,
    });
  } catch (error) {
    // Log the error or handle it as needed
    console.error(error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

const getEnrolledCourses = CatchAsyncError(async (req, res, next) => {
  try {
    console.log("req.user.id");

    // Use findById with populate to fetch user and populate the enrollments field
    const user = await User.findById(req.user.id).populate({
      path: "enrollments.courseId",
      select: "id title description duration",
    });

    console.log("user", user);

    // Now the user object should have enrollments populated with course details
    const enrolledCourses = user.enrollments.map((enrollment) => {
      const course = {
        _id: enrollment.courseId.id,
        title: enrollment.courseId.title,
        description: enrollment.courseId.description,
        duration: enrollment.courseId.duration,
      };
      return course;
    });

    console.log("courses", enrolledCourses);

    res.status(200).json({
      success: true,
      courses: enrolledCourses,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

module.exports = {
  createCourse,
  updateCourse,
  getCourseBycourseId,
  getAllCourses,
  assignMentor,
  getAllPublishedCourse,
  getCourseById,
  unassignMentor,
  getEnrolledCourses,
};
