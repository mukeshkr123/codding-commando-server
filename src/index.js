require("dotenv").config();
const app = require("./app/app");
const dbConnect = require("./config/dbConnect");

const PORT = process.env.PORT || 4000;

// create server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  // connect to database
  dbConnect();
});
