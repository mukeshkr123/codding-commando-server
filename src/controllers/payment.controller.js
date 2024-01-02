require("dotenv").config();
const CatchAsyncError = require("../middleware/catchAsyncError");
const PaymentDetail = require("../models/payment-detail.model");
const ErrorHandler = require("../utils/ErrorHandler");
const RazorPay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const Course = require("../models/course.model");
const User = require("../models/user.model");

const getPaymentDetails = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.id;

    const paymentDetail = await PaymentDetail.findOne({
      course: courseId,
    });

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      paymentDetail,
    });
  } catch (error) {
    console.error("Error in getPaymentDetails:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

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
const createPaymentOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const user = req.user;

    if (!user) {
      throw new Error("Unauthorized ");
    }

    const course = await Course.findById({ _id: courseId });

    if (!course) {
      throw new Error("Course not found");
    }

    const paymentDetail = await PaymentDetail.findById({
      _id: course.paymentDetail,
      course: course._id,
    });

    // razorpay instance
    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const payment_capture = 1;
    const amount = paymentDetail.fullPrice * 100;
    const currency = "INR";
    const options = {
      amount: amount.toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
      notes: {
        paymentFor: course.title,
        userId: user.id,
        courseId: course.id,
        imageUrl: course.imageUrl,
        description: paymentDetail.description,
      },
    };

    const order = await instance.orders.create(options);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error in creating payment order:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const verifyPaymentOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const courseId = req.params.courseId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // assign course to the user
      // const user = await User.findById({ _id: req.user.id });
      // user.enrollments.push(courseId);
      // user.save();
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create payment",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment created successfully",
    });
  } catch (error) {
    console.error("Error in verifying payment order:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  updatePaymentDetails,
  getPaymentDetails,
  createPaymentOrder,
  verifyPaymentOrder,
};
