const express = require("express");
const {
  toContact,
  getAllContacts,
  getContactById,
} = require("../../controllers/contact-to-controller");
const contactToRouter = express.Router();

contactToRouter.post("/message", toContact);
contactToRouter.get("/get-all", getAllContacts);
contactToRouter.get("/:id", getContactById);

module.exports = contactToRouter;
