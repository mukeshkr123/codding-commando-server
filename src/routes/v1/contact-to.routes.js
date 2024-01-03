const express = require("express");
const {
  toContact,
  getAllContacts,
  getContactById,
} = require("../../controllers/contact-to-controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const contactToRouter = express.Router();

contactToRouter.post("/message", toContact);
contactToRouter.get(
  "/get-all",
  isAuthenticated,
  authorizRoles("admin"),
  getAllContacts
);
contactToRouter.get(
  "/:id",
  isAuthenticated,
  authorizRoles("admin"),
  getContactById
);

module.exports = contactToRouter;
