const express = require("express");
const userRouter = require("./v1/user.routes");
const contactRouter = require("./v1/contact-to.routes");
const courseRouter = require("./v1/course.routes");
const mentorRouter = require("./v1/mentor.routes");
const router = express.Router();

// user routes
router.use("/users", userRouter);
// courses routes
router.use("/courses", courseRouter);
// contact router
router.use("/send", contactRouter);
router.use("/mentors", mentorRouter);

module.exports = router;
