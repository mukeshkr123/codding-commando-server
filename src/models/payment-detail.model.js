const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    courseTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    fullPrice: {
      type: Number,
    },
    installmentPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentDetail = mongoose.model("PaymentDetail", paymentSchema);

module.exports = PaymentDetail;
