const express = require("express");
const {
  toContact,
  getAllContacts,
  getContactById,
  markAsReadById,
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

contactToRouter.post(
  "/:id/mark-as-read",
  isAuthenticated,
  authorizRoles("admin"),
  markAsReadById
);

module.exports = contactToRouter;
