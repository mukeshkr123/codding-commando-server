const express = require("express");
const { createCourse } = require("../../controllers/course.controller");
const { isAuthenticated } = require("../../middleware/auth");
const courseRouter = express.Router();

// create course
courseRouter.post("/create", isAuthenticated, createCourse);

module.exports = courseRouter;
