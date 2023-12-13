require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ApiRoutes = require("../routes");
const ErrorMiddleware = require("../middleware/error");
const app = express();

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));
// body parser
app.use(express.json());
// cors
app.use(cors()); // TODO: later setup origin
// v1 routes
app.use("/api/v1", ApiRoutes);

//error middleware
app.use(ErrorMiddleware);
k;
module.exports = app;
