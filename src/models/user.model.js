require("dotenv").config();
const mongoose = require("mongoose");

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "Invalid email address",
      },
    },
    mobile: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    enrollments: [
      {
        courseId: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
    // // Payment Information (if applicable)
    // paymentHistory: [
    //   {
    //     courseId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Course",
    //     },
    //     amount: Number,
    //     timestamp: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
