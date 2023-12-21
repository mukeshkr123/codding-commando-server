const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumItemSchema = {
  title: String,
  description: String,
  imageUrl: String,
};

const paymentSchema = {
  course_title: String,
  course_description: String,
  courseImageUrl: String,
  fullPrice: {
    type: Number,
  },
  installmentPrice: {
    type: Number,
  },
};

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    imageUrl: String,
    duration: String,
    mode: String,
    about: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    curriculum_strategy: [curriculumItemSchema],
    program_curriculum: [
      {
        title: String,
        content: [
          {
            type: String,
          },
        ],
      },
    ],
    paymentDetail: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: "Instructor" }],
    enrollments: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        enrollmentDate: { type: Date, default: Date.now },
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
