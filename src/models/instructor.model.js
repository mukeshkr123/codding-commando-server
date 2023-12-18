const mongoose = require("mongoose");
const { Schema } = mongoose;

const instructorSchema = new Schema(
  {
    name: String,
    description: String,
    additionalInformation: [
      {
        type: String,
      },
    ],
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
