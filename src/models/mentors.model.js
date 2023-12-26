const mongoose = require("mongoose");

const mentorSchema = {
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
};

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
