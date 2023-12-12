const express = require("express");
const { registerUser } = require("../../controllers/user-controller");
const userRouter = express.Router();

//registration user
userRouter.post("/register", registerUser);

userRouter.use("/", (req, res) => {
  res.json({ success: true });
});

module.exports = userRouter;
