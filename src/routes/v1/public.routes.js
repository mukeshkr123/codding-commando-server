const express = require("express");
const {
  getAllPublishedCourse,
  getCourseById,
} = require("../../controllers/course.controller");
const publicRouter = express.Router();

publicRouter.get("/get-all/courses", getAllPublishedCourse);
publicRouter.get("/course/:courseId", getCourseById);

module.exports = publicRouter;
