const express = require("express");

const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  updateProgram,
  createProgram,
} = require("../../controllers/program-curriculum");
const programRouter = express.Router();

programRouter.post(
  "/:id/create-program",
  isAuthenticated,
  authorizRoles("student"),
  createProgram
);

programRouter.patch(
  "/:id/update-program",
  isAuthenticated,
  authorizRoles("student"),
  updateProgram
);

module.exports = programRouter;
