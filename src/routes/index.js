const express = require("express");
const userRouter = require("./v1/user.routes");
const contactRouter = require("./v1/contact-to.routes");
const router = express.Router();

// user routes
router.use("/users", userRouter);

// contact router
router.use("/send", contactRouter);

module.exports = router;
