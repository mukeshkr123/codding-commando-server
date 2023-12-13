const {
  registerUserService,
  activateUserService,
  loginUserService,
} = require("../services/user-service.js");
const { generateToken } = require("../utils/jwt.js");

// @user registration
// @/api/v1/users/register
const registerUser = async (req, res) => {
  try {
    const response = await registerUserService(req.body);
    res.status(201).json({
      success: true,
      message: `Please check your email ${response.user.email} to activate your account `,
      token: response.activationToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @user activation
// @/api/v1/users/activate
const activateUser = async (req, res) => {
  try {
    const user = await activateUserService(req.body);
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @user activation
// @/api/v1/users/login
const loginUser = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  activateUser,
  loginUser,
};
