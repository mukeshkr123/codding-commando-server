const CatchAsyncError = require("../middleware/catchAsyncError");
const Purchase = require("../models/purchase");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

const getAnalytics = CatchAsyncError(async (req, res, next) => {
  try {
    const purchases = await Purchase.find();

    // Calculate total sales and total price
    let totalSales = 0;
    let totalPrice = 0;

    purchases.forEach((purchase) => {
      totalSales += 1; // Assuming each purchase represents one sale
      totalPrice += purchase.amount;
    });

    const users = await User.find({ role: "student" });

    return res.status(200).json({
      success: true,
      data: {
        totalSales,
        totalPrice,
        totalStudents: users?.length,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  getAnalytics,
};
