const express = require("express");
const {
  registerUser,
  activateUser,
  loginUser,
  getAllStudents,
  getUserById,
  getUserByToken,
} = require("../../controllers/user-controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const userRouter = express.Router();

//registration user
userRouter.post("/register", registerUser);
//activate user
userRouter.post("/activate", activateUser);
// login user
userRouter.post("/login", loginUser);
// get all students
userRouter.get(
  "/students",
  isAuthenticated,
  authorizRoles("admin"),
  getAllStudents
);

userRouter.get("/students/:studentId", getUserById);
userRouter.get("/session", isAuthenticated, getUserByToken);

module.exports = userRouter;
