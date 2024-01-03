const express = require("express");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const { getAnalytics } = require("../../controllers/analytics--controller");
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/analytics",
  isAuthenticated,
  authorizRoles("admin"),
  getAnalytics
);

module.exports = analyticsRouter;
