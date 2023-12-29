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
  authorizRoles("admin"),
  createMentor
);

mentorRouter.get(
  "/:mentorId",
  isAuthenticated,
  authorizRoles("admin"),
  getMentorsById
);

mentorRouter.patch(
  "/:mentorId",
  isAuthenticated,
  authorizRoles("admin"),
  updateMentor
);

mentorRouter.patch(
  "/:mentorId/publish",
  isAuthenticated,
  authorizRoles("admin"),
  publishMentor
);

mentorRouter.patch(
  "/:mentorId/unpublish",
  isAuthenticated,
  authorizRoles("admin"),
  unpublishMentor
);

mentorRouter.delete(
  "/:mentorId",
  isAuthenticated,
  authorizRoles("admin"),
  deleteMentor
);

mentorRouter.get("/", isAuthenticated, authorizRoles("student"), getAllMentors);

module.exports = mentorRouter;
