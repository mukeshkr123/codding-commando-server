const Course = require("../models/course.model");

const createCourseService = async (user, courseData) => {
  try {
    const { _id: userId } = user;
    const { title } = courseData;

    if (!title) {
      throw new Error("Please enter a course title");
    }

    const course = await Course.create({
      title,
      userId,
    });

    return course;
  } catch (error) {
    throw new Error(`Error creating course: ${error.message}`);
  }
};

const updateCourseService = async (courseId, { _id: userId }, values) => {
  try {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    console.log("courseId", courseId);
    console.log("userId", userId);

    const course = await Course.findOneAndUpdate(
      { _id: courseId, userId },
      { $set: values },
      { new: true } // Return the modified document
    );

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  } catch (error) {
    throw new Error(`Error updating course: ${error.message}`);
  }
};

module.exports = {
  createCourseService,
  updateCourseService,
};
