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
  authorizRoles("admin"),
  createStrategy
);

strategyRouter.patch(
  "/:courseId/strategy/:strategyId/update",
  isAuthenticated,
  authorizRoles("admin"),
  updateStrategy
);

strategyRouter.get(
  "/:courseId/strategy/:strategyId",
  isAuthenticated,
  authorizRoles("admin"),
  getStrategyById
);

strategyRouter.patch(
  "/:courseId/strategy/:strategyId/publish",
  isAuthenticated,
  authorizRoles("admin"),
  publishStrategy
);

strategyRouter.patch(
  "/:courseId/strategy/:strategyId/unpublish",
  isAuthenticated,
  authorizRoles("admin"),
  unpublishStrategy
);

strategyRouter.delete(
  "/:courseId/strategy/:strategyId",
  isAuthenticated,
  authorizRoles("admin"),
  deleteStrategy
);

module.exports = strategyRouter;
