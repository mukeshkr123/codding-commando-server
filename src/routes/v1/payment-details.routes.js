const express = require("express");
const {
  updatePaymentDetails,
  getPaymentDetails,
  createPaymentOrder,
  verifyPaymentOrder,
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

//create payment order
paymentRouter.get(
  "/:courseId/payment/create-order",
  isAuthenticated,
  createPaymentOrder
);
paymentRouter.post(
  "/:courseId/payment/verify",
  isAuthenticated,
  verifyPaymentOrder
);

module.exports = paymentRouter;
