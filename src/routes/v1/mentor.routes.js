const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  createMentor,
  getMentorsById,
  updateMentor,
  getAllMentors,
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

mentorRouter.patch(
  "/:mentorId",
  isAuthenticated,
  authorizRoles("student"),
  updateMentor
);

mentorRouter.get("/", isAuthenticated, authorizRoles("student"), getAllMentors);

module.exports = mentorRouter;
