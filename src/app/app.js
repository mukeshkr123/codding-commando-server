require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ApiRoutes = require("../routes");
const ErrorMiddleware = require("../middleware/error");
const publicRoutes = require("../routes/v1/public.routes");
const app = express();

// body parser
app.use(express.json());
// cors
app.use(cors()); // TODO: later setup origin
// v1 routes
app.use("/api/v1", ApiRoutes);
//public routes
app.use("/api/v1", publicRoutes);

// test route
app.get("/test", (req, res) => {
  res.send("Welcome Back!");
});

//error middleware
app.use(ErrorMiddleware);
module.exports = app;
