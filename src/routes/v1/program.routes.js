const express = require("express");

const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  updateProgram,
  createProgram,
  getProgramById,
  publishProgram,
  unpublishProgram,
  deleteProgram,
  deleteProgramDescription,
} = require("../../controllers/program-curriculum");
const programRouter = express.Router();

programRouter.post(
  "/:id/create-program",
  isAuthenticated,
  authorizRoles("admin"),
  createProgram
);

programRouter.patch(
  "/:courseId/program/:programId/update",
  isAuthenticated,
  authorizRoles("admin"),
  updateProgram
);

programRouter.get(
  "/:courseId/program/:programId",
  isAuthenticated,
  authorizRoles("admin"),
  getProgramById
);

programRouter.patch(
  "/:courseId/program/:programId/publish",
  isAuthenticated,
  authorizRoles("admin"),
  publishProgram
);

programRouter.patch(
  "/:courseId/program/:programId/unpublish",
  isAuthenticated,
  authorizRoles("admin"),
  unpublishProgram
);

programRouter.delete(
  "/:courseId/program/:programId",
  isAuthenticated,
  authorizRoles("admin"),
  deleteProgram
);

programRouter.delete(
  "/:courseId/program/:programId/:descriptionId",
  isAuthenticated,
  authorizRoles("admin"),
  deleteProgramDescription
);
module.exports = programRouter;
