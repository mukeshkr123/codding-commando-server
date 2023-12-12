require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ApiRoutes = require("../routes");
const app = express();

// body parser
app.use(express.json());
// cors
app.use(cors()); // TODO: later setup origin
// v1 routes
app.use("/api/v1", ApiRoutes);

module.exports = app;
