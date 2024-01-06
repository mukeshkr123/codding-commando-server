const express = require("express");
const {
  registerUser,
  activateUser,
  loginUser,
  getAllStudents,
  getUserById,
  getUserByToken,
  blockUser,
  unblockUser,
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

userRouter.get(
  "/students/:studentId",
  isAuthenticated,
  authorizRoles("admin"),
  getUserById
);
userRouter.patch(
  "/students/:studentId/block",
  isAuthenticated,
  authorizRoles("admin"),
  blockUser
);
userRouter.patch(
  "/students/:studentId/unblock",
  isAuthenticated,
  authorizRoles("admin"),
  unblockUser
);
userRouter.get("/session", isAuthenticated, getUserByToken);

module.exports = userRouter;
