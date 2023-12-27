const express = require("express");

const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  updateProgram,
  createProgram,
  getProgramById,
  publishProgram,
  unpublishProgram,
  deleteProgram,
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

programRouter.patch(
  "/:courseId/program/:programId/publish",
  isAuthenticated,
  authorizRoles("student"),
  publishProgram
);

programRouter.patch(
  "/:courseId/program/:programId/unpublish",
  isAuthenticated,
  authorizRoles("student"),
  unpublishProgram
);

programRouter.delete(
  "/:courseId/program/:programId",
  isAuthenticated,
  authorizRoles("student"),
  deleteProgram
);
module.exports = programRouter;
