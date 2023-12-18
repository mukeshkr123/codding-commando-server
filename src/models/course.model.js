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
  oneTimePrice: {
    type: Number,
    required: true,
  },
  installmentsPrice: {
    type: Number,
    required: true,
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
    payments: paymentSchema,
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
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
