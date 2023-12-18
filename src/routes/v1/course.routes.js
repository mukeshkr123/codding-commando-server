const express = require("express");
const { createCourse } = require("../../controllers/course.controller");
const courseRouter = express.Router();

// create course
courseRouter.post("/create", createCourse);

module.exports = courseRouter;
