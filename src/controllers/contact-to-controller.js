const CatchAsyncError = require("../middleware/catchAsyncError");
const contactService = require("../services/contact-service");

const toContact = CatchAsyncError(async (req, res, next) => {
  try {
    const { phone, email } = req.body;

    const contact = await contactService.createContact(req.body);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return next(error);
  }
});

const getAllContacts = CatchAsyncError(async (req, res, next) => {
  try {
    const contacts = await contactService.getAllContacts();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      contacts,
    });
  } catch (error) {
    return next(error);
  }
});

const getContactById = CatchAsyncError(async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      contact,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = { toContact, getAllContacts, getContactById };
