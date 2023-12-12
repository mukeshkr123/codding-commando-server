const User = require("../models/user.model");
const createActivationToken = require("../utils/generateActivationToken");
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../utils/sendMail");

// registration service
const registerUserService = async (userData) => {
  try {
    const { firstName, lastName, phone, email, password } = userData;

    // check if email exists
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      throw new Error("Email already exists");
    }

    const user = {
      firstName,
      lastName,
      phone,
      email,
      password,
    };

    // activation token and code
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    console.log(activationCode);

    const data = { user: { name: user.firstName }, activationCode };
    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    try {
      await sendMail({
        email: user.email,
        subject: "Account Activation",
        template: "activation-mail.ejs",
        data,
      });

      return {
        success: true,
        user,
        activationToken: activationToken.token,
      };
    } catch (error) {
      throw new Error("Error sending activation email: " + error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerUserService,
};
