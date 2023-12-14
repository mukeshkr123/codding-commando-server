const express = require("express");
const {
  toContact,
  bookDemo,
} = require("../../controllers/contact-to-controller");
const contactToRouter = express.Router();

contactToRouter.post("/message", toContact);
contactToRouter.post("/book-demo", bookDemo);

module.exports = contactToRouter;
