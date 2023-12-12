require("dotenv").config();
const User = require("../models/user.model");
const createActivationToken = require("../utils/generateActivationToken");
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

// registration service
const registerUserService = async (userData) => {
  try {
    const { firstName, lastName, phone, email, password } = userData;

    // check if email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
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

// activate user service
const activateUserService = async (activationData) => {
  try {
    const { activationCode, activationToken } = activationData;

    //decode user
    const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    console.log(newUser.activationCode);

    //verify activation code
    if (newUser.activationCode !== activationCode) {
      throw new Error("Invalid activation code ");
    }

    const { firstName, lastName, phone, email, password } = newUser.user;

    // check if user is already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new Error("Email already exists");
    }

    // create new user
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    console.log(user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerUserService,
  activateUserService,
};
