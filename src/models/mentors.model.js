const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    description: {
      type: String,
    },
    additionInfo: [
      {
        type: String,
      },
    ],
    assignCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["mentor", "member"],
      default: "mentor",
    },
    courseAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
