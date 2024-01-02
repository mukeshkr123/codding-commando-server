const CatchAsyncError = require("../middleware/catchAsyncError");
const Contact = require("../models/contact.model");
const ErrorHandler = require("../utils/ErrorHandler");

const toContact = CatchAsyncError(async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, message, type } = req.body;

    if (!firstName || !lastName || !phone || !email || !message) {
      throw new Error("Please provide all required fields");
    }

    // create a record for contact
    await Contact.create({
      firstName,
      lastName,
      phone,
      email,
      message,
      Type: type,
    });

    // send a thank you email

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllContacts = CatchAsyncError(async (req, res, next) => {
  try {
    const contacts = await Contact.find({});

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      contacts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getContactById = CatchAsyncError(async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Feteched Successfully",
      contact,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = { toContact, getAllContacts, getContactById };
