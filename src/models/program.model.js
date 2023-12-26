const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: String,
    description: [
      {
        type: String,
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

const Curriculum = mongoose.model("Curriculum", curriculumSchema);

module.exports = Curriculum;
