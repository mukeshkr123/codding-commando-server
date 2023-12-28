const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  createMentor,
  getMentorsById,
  updateMentor,
  getAllMentors,
  publishMentor,
  unpublishMentor,
  deleteMentor,
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

mentorRouter.patch(
  "/:mentorId/publish",
  isAuthenticated,
  authorizRoles("student"),
  publishMentor
);

mentorRouter.patch(
  "/:mentorId/unpublish",
  isAuthenticated,
  authorizRoles("student"),
  unpublishMentor
);

mentorRouter.delete(
  "/:mentorId",
  isAuthenticated,
  authorizRoles("student"),
  deleteMentor
);

mentorRouter.get("/", isAuthenticated, authorizRoles("student"), getAllMentors);

module.exports = mentorRouter;
