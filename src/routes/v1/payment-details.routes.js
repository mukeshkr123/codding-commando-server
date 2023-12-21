const express = require("express");
const createPaymentDetails = require("../../controllers/payment.controller");
const { isAuthenticated } = require("../../middleware/auth");
const paymentRouter = express.Router();

paymentRouter.patch(
  "/:id/payment-detail",
  isAuthenticated,
  createPaymentDetails
);

module.exports = paymentRouter;
