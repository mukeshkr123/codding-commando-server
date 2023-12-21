const express = require("express");
const {
  updatePaymentDetails,
  getPaymentDetails,
} = require("../../controllers/payment.controller");
const { isAuthenticated, authorizRoles } = require("../../middleware/auth");
const paymentRouter = express.Router();

paymentRouter.patch(
  "/:id/payment-details",
  isAuthenticated,
  authorizRoles("student"),
  updatePaymentDetails
);
paymentRouter.get(
  "/:id/payment-details",
  isAuthenticated,
  authorizRoles("student"),
  getPaymentDetails
);

module.exports = paymentRouter;
