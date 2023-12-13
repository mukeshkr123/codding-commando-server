const express = require("express");
const {
  registerUser,
  activateUser,
  loginUser,
} = require("../../controllers/user-controller");
const userRouter = express.Router();

//registration user
userRouter.post("/register", registerUser);
//activate user
userRouter.post("/activate", activateUser);
// login user
userRouter.post("/login", loginUser);

userRouter.use("/", (req, res) => {
  res.json({ success: true });
});

module.exports = userRouter;
