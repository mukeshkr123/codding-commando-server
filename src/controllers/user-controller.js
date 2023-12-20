const CatchAsyncError = require("../middleware/catchAsyncError.js");
const {
  registerUserService,
  activateUserService,
  loginUserService,
} = require("../services/user-service.js");
const ErrorHandler = require("../utils/ErrorHandler");

// @user registration
// @/api/v1/users/register
const registerUser = CatchAsyncError(async (req, res, next) => {
  try {
    const response = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: `Please check your email ${response.user.email} to activate your account `,
      token: response.activationToken,
      user: response.user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// @user activation
// @/api/v1/users/activate
const activateUser = async (req, res, next) => {
  try {
    const user = await activateUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// @user activation
// @/api/v1/users/login
const loginUser = async (req, res, next) => {
  try {
    const { user, accessToken } = await loginUserService(req.body);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        accessToken,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = {
  registerUser,
  activateUser,
  loginUser,
};
