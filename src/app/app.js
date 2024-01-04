require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ApiRoutes = require("../routes");
const ErrorMiddleware = require("../middleware/error");
const publicRoutes = require("../routes/v1/public.routes");
const app = express();
const rateLimit = require("express-rate-limit");

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));
// body parser
app.use(express.json());

// CORS middleware
const corsOptions = {
  origin: process.env.ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, Authorization headers, etc.)
  optionsSuccessStatus: 204, // Respond with a 204 status code for preflight requests
};
app.use(cors(corsOptions));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

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
