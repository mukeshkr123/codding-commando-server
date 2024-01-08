const CatchAsyncError = require("../middleware/catchAsyncError");
const Purchase = require("../models/purchase");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

const getAnalytics = CatchAsyncError(async (req, res, next) => {
  try {
    const purchases = await Purchase.find().populate("courseId"); // Populate courseId with course information
    console.log(purchases);

    // Calculate total sales, total price, and course-wise revenue
    let totalSales = 0;
    let totalPrice = 0;
    const courseRevenue = {};

    purchases.forEach((purchase) => {
      totalSales += 1; // Assuming each purchase represents one sale
      totalPrice += purchase.amount;

      const { courseId, amount } = purchase;

      // Check if courseId is available and has a title
      if (courseId && courseId.title) {
        const courseTitle = courseId.title;

        // Aggregate revenue for each course
        if (courseTitle in courseRevenue) {
          courseRevenue[courseTitle] += amount;
        } else {
          courseRevenue[courseTitle] = amount;
        }
      }
    });

    const users = await User.find({ role: "student" });

    // Convert courseRevenue object to an array
    const courseRevenueArray = Object.keys(courseRevenue).map(
      (courseTitle) => ({
        course: courseTitle,
        revenue: courseRevenue[courseTitle],
      })
    );

    return res.status(200).json({
      success: true,
      data: {
        totalSales,
        totalPrice,
        totalStudents: users?.length,
        courseRevenue: courseRevenueArray,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  getAnalytics,
};
