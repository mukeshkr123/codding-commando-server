const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const {
  createStrategy,
  updateStrategy,
  getStrategyById,
  publishStrategy,
  unpublishStrategy,
  deleteStrategy,
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

strategyRouter.patch(
  "/:courseId/strategy/:strategyId/publish",
  isAuthenticated,
  authorizRoles("student"),
  publishStrategy
);

strategyRouter.patch(
  "/:courseId/strategy/:strategyId/unpublish",
  isAuthenticated,
  authorizRoles("student"),
  unpublishStrategy
);

strategyRouter.delete(
  "/:courseId/strategy/:strategyId",
  isAuthenticated,
  authorizRoles("student"),
  deleteStrategy
);

module.exports = strategyRouter;
