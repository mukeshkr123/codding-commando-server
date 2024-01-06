const mongoose = require("mongoose");
const { Schema } = mongoose;

const curriculumSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProgramDesc",
    },
  ],
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Curriculum = mongoose.model("Curriculum", curriculumSchema);

const program_descriptionSchema = new Schema({
  program: {
    type: Schema.Types.ObjectId,
    ref: "Curriculum",
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const ProgramDesc = mongoose.model("ProgramDesc", program_descriptionSchema);

module.exports = { Curriculum, ProgramDesc };
