const { isValidObjectId } = require("mongoose");
const CatchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/user.model.js");
const {
  registerUserService,
  activateUserService,
  loginUserService,
} = require("../services/user-service.js");
const ErrorHandler = require("../utils/ErrorHandler");

// @user registration
// @/api/v1/users/register
const registerUser = CatchAsyncError(async (req, res, next) => {
  try {
    const response = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: `Please check your email ${response.user.email} to activate your account `,
      token: response.activationToken,
      user: response.user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// @user activation
// @/api/v1/users/activate
const activateUser = async (req, res, next) => {
  try {
    const user = await activateUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// @user activation
// @/api/v1/users/login
const loginUser = async (req, res, next) => {
  try {
    const { user, accessToken } = await loginUserService(req.body);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        accessToken,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get all students
const getAllStudents = CatchAsyncError(async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "firstName lastName email phone createdAt"
    );

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      students,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getUserById = CatchAsyncError(async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    if (!isValidObjectId(studentId)) {
      throw new ErrorHandler("Inavalid user id ", 400);
    }

    const user = await User.findById(studentId)
      .populate({
        path: "enrollments.courseId",
        select: "title",
      })
      .populate({
        path: "paymentHistory.courseId",
        select: "title",
      });

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getUserByToken = CatchAsyncError(async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      user: {
        name: user?.firstName + " " + user?.lastName,
        email: user?.email,
        phone: user?.phone,
        role: user?.role,
        avatar: user?.avatar,
        enrolledCourses: user?.enrollments,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const blockUser = CatchAsyncError(async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    if (!isValidObjectId(studentId)) {
      throw new ErrorHandler("Invalid user id", 400);
    }

    const user = await User.findByIdAndUpdate(
      studentId,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User blocked successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const unblockUser = CatchAsyncError(async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    if (!isValidObjectId(studentId)) {
      throw new ErrorHandler("Invalid user id", 400);
    }

    const user = await User.findByIdAndUpdate(
      studentId,
      { isBlocked: false },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User unblocked successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  registerUser,
  activateUser,
  loginUser,
  getAllStudents,
  getUserById,
  getUserByToken,
  blockUser,
  unblockUser,
};
