const express = require("express");
const userRouter = require("./v1/user.routes");
const contactRouter = require("./v1/contact-to.routes");
const courseRouter = require("./v1/course.routes");
const mentorRouter = require("./v1/mentor.routes");
const {
  getEnrolledCourses,
  getCoursesBanner,
} = require("../controllers/course.controller");
const { isAuthenticated, authorizRoles } = require("../middleware/auth");
const analyticsRouter = require("./v1/analytics.routes");
const { getAllMentorsByUser } = require("../controllers/mentor-controller");
const { getAllPuchase } = require("../controllers/payment.controller");
const router = express.Router();

// user routes
router.use("/users", userRouter);
// courses routes
router.use("/courses", courseRouter);
// enrolled courses
router.get("/enrolled-courses", isAuthenticated, getEnrolledCourses);

// contact router
router.use("/send", contactRouter);
router.use("/mentors", mentorRouter);
router.use("/", analyticsRouter);
router.get("/teachers", getAllMentorsByUser);
router.get("/banners", getCoursesBanner);
router.get(
  "/purchases",
  isAuthenticated,
  authorizRoles("admin"),
  getAllPuchase
);

module.exports = router;
