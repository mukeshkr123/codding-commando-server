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
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Curriculum = mongoose.model("Curriculum", curriculumSchema);

module.exports = Curriculum;
