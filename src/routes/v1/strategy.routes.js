const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  createStrategy,
  updateStrategy,
  getStrategyById,
} = require("../../controllers/strategy.controller");
const strategyRouter = express.Router();

strategyRouter.post(
  "/:id/create-strategy",
  isAuthenticated,
  authorizRoles("student"),
  createStrategy
);

strategyRouter.patch(
  "/:courseId/strategy/:strategyId/update",
  isAuthenticated,
  authorizRoles("student"),
  updateStrategy
);

strategyRouter.get(
  "/:courseId/strategy/:strategyId",
  isAuthenticated,
  authorizRoles("student"),
  getStrategyById
);

module.exports = strategyRouter;
