require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose
      .connect(dbUrl, {
        dbName: "CODDING_COMMANDO",
      })
      .then((data) => {
        console.log(`Database connected with ${data.connection.host} `);
      });
  } catch (error) {
    console.log(error.message);
    setTimeout(dbConnect, 5000);
  }
};

module.exports = dbConnect;
