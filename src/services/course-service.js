const Course = require("../models/course.model");

const createCourseService = async (courseData) => {
  try {
    const userId = "657afd04293206c5feba6282";
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
    throw new Error(error.message);
  }
};

module.exports = {
  createCourseService,
};
