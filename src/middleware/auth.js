const CatchAsyncError = require("./catchAsyncError");
const Jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/user.model");

const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  let accessToken;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return next(
        new ErrorHandler(
          "Unauthorized: Please log in to access this resource",
          401
        )
      );
    }

    try {
      const decoded = Jwt.verify(accessToken, process.env.JWT_KEY);

      if (!decoded || decoded.exp <= Date.now() / 1000) {
        return next(
          new ErrorHandler("Access token is expired or not valid", 401)
        );
      }

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return next(
          new ErrorHandler(
            "Unauthorized: Token expired, please log in again",
            401
          )
        );
      }

      req.user = user;
      next();
    } catch (err) {
      return next(new ErrorHandler("Unauthorized: Token is not valid", 401));
    }
  } else {
    return next(
      new ErrorHandler("Unauthorized: No token attached to the header", 401)
    );
  }
});

module.exports = {
  isAuthenticated,
};
