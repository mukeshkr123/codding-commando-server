const express = require("express");
const userRouter = require("./v1/user.routes");
const router = express.Router();

// user routes
router.use("/users", userRouter);

module.exports = router;
