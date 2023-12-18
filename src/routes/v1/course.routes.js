const express = require("express");
const {
  createCourse,
  updateCourse,
} = require("../../controllers/course.controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const courseRouter = express.Router();

// create course
courseRouter.post(
  "/create",
  isAuthenticated,
  authorizRoles("student"),
  createCourse
);
// update course
courseRouter.patch(
  "/update/:id",
  isAuthenticated,
  authorizRoles("student"),
  updateCourse
);

module.exports = courseRouter;
