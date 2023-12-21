const CatchAsyncError = require("../middleware/catchAsyncError");
const PaymentDetail = require("../models/payment-detail.model");
const ErrorHandler = require("../utils/ErrorHandler");

const updatePaymentDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const data = req.body;

    const payment = await PaymentDetail.findOneAndUpdate(
      { course: courseId },
      { $set: data },
      { new: true, lean: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      payment,
    });
  } catch (error) {
    console.error("Error in updatePaymentDetails:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = updatePaymentDetails;
