const {
  registerUserService,
  activateUserService,
} = require("../services/user-service.js");

// @user registration
// @/api/v1/users/register
const registerUser = async (req, res) => {
  try {
    const response = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: `Please check your email ${response.user.email} to activate your account `,
      token: response.activationToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// @user activatiob
// @/api/v1/users/activate
const activateUser = async (req, res) => {
  try {
    const user = await activateUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  activateUser,
};
