require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
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
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+91\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Please use the format +91XXXXXXXXXX`,
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
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    enrollments: [
      {
        courseId: mongoose.Schema.ObjectId,
        // ref: "Course",
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

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
  console.log(`User ${this.email} created/updated at ${new Date()}`);
  return next();
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
