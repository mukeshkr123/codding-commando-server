const express = require("express");

const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  updateProgram,
  createProgram,
  getProgramById,
} = require("../../controllers/program-curriculum");
const programRouter = express.Router();

programRouter.post(
  "/:id/create-program",
  isAuthenticated,
  authorizRoles("student"),
  createProgram
);

programRouter.patch(
  "/:courseId/program/:programId/update",
  isAuthenticated,
  authorizRoles("student"),
  updateProgram
);

programRouter.get(
  "/:courseId/program/:programId",
  isAuthenticated,
  authorizRoles("student"),
  getProgramById
);

module.exports = programRouter;
