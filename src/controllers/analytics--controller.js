const CatchAsyncError = require("../middleware/catchAsyncError");
const Purchase = require("../models/purchase");
const ErrorHandler = require("../utils/ErrorHandler");

const groupByCourse = (purchases) => {
  return purchases.reduce((grouped, purchase) => {
    const course = purchase.course;
    if (course && course.title) {
      const courseTitle = course.title;
      grouped[courseTitle] = (grouped[courseTitle] || 0) + course.price;
    }
    return grouped;
  }, {});
};

const getAnalytics = CatchAsyncError(async (req, res, next) => {
  try {
    const purchases = await Purchase.find();

    const groupedEarning = groupByCourse(purchases);
    const data = Object.entries(groupedEarning).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return res.status(200).json({
      success: true,
      data,
      totalRevenue,
      totalSales,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  getAnalytics,
};
