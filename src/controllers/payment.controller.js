require("dotenv").config();
const CatchAsyncError = require("../middleware/catchAsyncError");
const PaymentDetail = require("../models/payment-detail.model");
const ErrorHandler = require("../utils/ErrorHandler");
const RazorPay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const Purchase = require("../models/purchase");

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
    const method = req.body.method;

    if (method !== "fullPrice" && method !== "installment") {
      throw new Error("Something went wrong , please try again later");
    }

    if (!user) {
      throw new Error("Unauthorized ");
    }

    const course = await Course.findById({ _id: courseId });

    if (!course) {
      throw new Error("Course not found");
    }

    const userEnrolled = course.enrollments.some(
      (enrollment) => enrollment.student.toString() == user.id
    );

    if (userEnrolled) {
      throw new Error("You have already enrolled in this course");
    }

    const enrolledALready = user.enrollments.some(
      (enrollment) => enrollment.courseId.toString() === courseId
    );

    if (enrolledALready) {
      throw new Error("You have already enrolled in this course");
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

    let price;

    if (method === "fullPrice") {
      price = paymentDetail?.fullPrice;
    } else {
      price = paymentDetail?.installmentPrice;
    }

    const payment_capture = 1;
    const amount = price * 100;
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
        description: course.title,
        method: method,
      },
    };

    const order = await instance.orders.create(options);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      phone: user?.phone,
      price,
      method,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const verifyPaymentOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      method,
    } = req.body;

    const courseId = req.params.courseId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // assign course to the user
      const user = await User.findById(req.user.id);

      const data = {
        courseId: courseId,
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      };

      user.paymentHistory.push(data);
      user.enrollments.push({ courseId: courseId, paymentType: method });
      await user.save();

      //save the user in course
      const course = await Course.findById(courseId);
      course.enrollments.push({ student: user._id });
      await course.save();

      const purchase = await Purchase.create({
        courseId: courseId,
        userId: user._id,
        amount: amount,
        method: method,
      });
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
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllPuchase = CatchAsyncError(async (req, res, next) => {
  try {
    const response = await Purchase.find()
      .populate({
        path: "userId",
        select: "firstName email",
      })
      .populate({
        path: "courseId",
        select: "title",
      });

    console.log(response);

    const results = response.map((purchase) => ({
      name: purchase.userId.firstName,
      email: purchase.userId.email,
      amount: purchase.amount,
      courseTitle: purchase?.courseId?.title,
      createdAt: purchase.createdAt,
      method: purchase.method,
    }));

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  updatePaymentDetails,
  getPaymentDetails,
  createPaymentOrder,
  verifyPaymentOrder,
  getAllPuchase,
};
