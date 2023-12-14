const mongoose = require("mongoose");

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookDemoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: {
      validator: function (value) {
        return emailRegexPattern.test(value);
      },
      message: "Invalid email address",
    },
  },
  message: {
    type: String,
  },
});

const Demo = mongoose.model("Demo", bookDemoSchema);

export default Demo;
