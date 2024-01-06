const Contact = require("../models/contact.model");
const { isValidObjectId } = require("../utils");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");

const createContact = async (data) => {
  const { firstName, lastName, phone, email, message, type } = data;

  if (!firstName || !lastName || !phone || !email || !message || !type) {
    throw new ErrorHandler("Please provide all required fields", 400);
  }

  const contact = await Contact.create({
    firstName,
    lastName,
    phone,
    email,
    message,
    Type: type,
  });

  if (!contact) {
    throw new ErrorHandler("Failed to create a contact record", 500);
  }

  const mailData = { user: { name: firstName } };
  const template = type === "Contact" ? "contact-mail.ejs" : "demo-mail.ejs";

  try {
    await sendMail({
      email: contact.email,
      subject: "Contact Information",
      template,
      data: mailData,
    });

    return contact;
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

const getAllContacts = async () => {
  try {
    return await Contact.find({});
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

const getContactById = async (id) => {
  try {
    if (!isValidObjectId(id)) {
      throw new ErrorHandler("Invalid contact ID", 400);
    }
    return await Contact.findByIdAndUpdate(id, {
      seen: true,
    });
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

module.exports = { createContact, getAllContacts, getContactById };
