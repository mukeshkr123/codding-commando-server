const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  createStrategy,
  updateStrategy,
} = require("../../controllers/strategy.controller");
const strategyRouter = express.Router();

strategyRouter.post(
  "/:id/create-strategy",
  isAuthenticated,
  authorizRoles("student"),
  createStrategy
);

strategyRouter.patch(
  "/:id/update-strategy",
  isAuthenticated,
  authorizRoles("student"),
  updateStrategy
);

module.exports = strategyRouter;
