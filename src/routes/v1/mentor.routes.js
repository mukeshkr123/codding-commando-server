const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  createMentor,
  getMentorsById,
} = require("../../controllers/mentor-controller");
const mentorRouter = express.Router();

mentorRouter.post(
  "/create",
  isAuthenticated,
  authorizRoles("student"),
  createMentor
);

mentorRouter.get(
  "/:mentorId",
  isAuthenticated,
  authorizRoles("student"),
  getMentorsById
);

module.exports = mentorRouter;
