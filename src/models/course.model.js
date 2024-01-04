const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumItemSchema = {
  title: String,
  description: String,
  imageUrl: String,
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
    strategy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Strategy",
      },
    ],
    program_curriculum: [
      {
        type: Schema.Types.ObjectId,
        ref: "Curriculum",
      },
    ],
    paymentDetail: {
      type: Schema.Types.ObjectId,
      ref: "PaymentDetail",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    mentors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Mentor",
      },
    ],
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
    banner: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
