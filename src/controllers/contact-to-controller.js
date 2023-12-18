const Contact = require("../models/contact.model");
const ErrorHandler = require("../utils/ErrorHandler");

const toContact = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    if (!firstName || !lastName || !phone || !email || !message) {
      throw new Error("Please provide all required fields");
    }

    // create a record for contact
    await Contact.create({ firstName, lastName, phone, email, message });

    // send a thank you email

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const bookDemo = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    if (!firstName || !lastName || !phone || !email || !message) {
      throw new Error("Please provide all required fields");
    }

    // create a record for contact
    await Contact.create({ firstName, lastName, phone, email, message });

    // send a thank you email

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = { toContact, bookDemo };
