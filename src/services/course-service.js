const Course = require("../models/course.model");
const PaymentDetail = require("../models/payment-detail.model");

const createCourseService = async (user, courseData) => {
  try {
    const { _id: userId } = user;
    const { title } = courseData;

    if (!title) {
      throw new Error("Please enter a course title");
    }

    // Create the course
    const course = await Course.create({
      title,
      userId,
    });

    // Create payment details
    const payment = await PaymentDetail.create({
      courseTitle: course.title,
      course: course._id,
    });

    // Link the payment to the course
    course.paymentDetail = payment._id;

    // Save the course with the linked payment
    await course.save();

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
