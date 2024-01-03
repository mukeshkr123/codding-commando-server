const express = require("express");
const {
  createCourse,
  updateCourse,
  getCourseBycourseId,
  getAllCourses,
  assignMentor,
  getAllPublishedCourse,
  unassignMentor,
  getEnrolledCourses,
  publishCourse,
  unpublishCourse,
  deleteCourse,
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
  authorizRoles("admin"),
  createCourse
);
// update course
courseRouter.patch(
  "/update/:id",
  isAuthenticated,
  authorizRoles("admin"),
  updateCourse
);
// get course by id
courseRouter.get(
  "/:id",
  isAuthenticated,
  authorizRoles("admin"),
  getCourseBycourseId
);
// assign mentor
courseRouter.post(
  "/:id/assign-mentor",
  isAuthenticated,
  authorizRoles("admin"),
  assignMentor
);

//unassign mentor
courseRouter.post(
  "/:id/unassign-mentor",
  isAuthenticated,
  authorizRoles("admin"),
  unassignMentor
);

courseRouter.patch(
  "/:courseId/publish",
  isAuthenticated,
  authorizRoles("admin"),
  publishCourse
);
courseRouter.patch(
  "/:courseId/unpublish",
  isAuthenticated,
  authorizRoles("admin"),
  unpublishCourse
);
courseRouter.delete(
  "/:courseId/delete",
  isAuthenticated,
  authorizRoles("admin"),
  deleteCourse
);

// get courses by userid
courseRouter.get("/", isAuthenticated, getAllCourses);
courseRouter.use("/", paymentRouter);
courseRouter.use("/", programRouter);
courseRouter.use("/", strategyRouter);

module.exports = courseRouter;
