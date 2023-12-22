const express = require("express");
const {
  createCourse,
  updateCourse,
  getCourseBycourseId,
  getAllCourses,
} = require("../../controllers/course.controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const paymentRouter = require("./payment-details.routes");
const programRouter = require("./program.routes");
const strategyRouter = require("./strategy.routes");
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
// get course by id
courseRouter.get(
  "/:id",
  isAuthenticated,
  authorizRoles("student"),
  getCourseBycourseId
);
// get courses by userid
courseRouter.get("/", isAuthenticated, getAllCourses);
courseRouter.use("/", paymentRouter);
courseRouter.use("/", programRouter);
courseRouter.use("/", strategyRouter);

module.exports = courseRouter;
