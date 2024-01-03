require("dotenv").config();
const app = require("./app/app");
const dbConnect = require("./config/dbConnect");
const Purchase = require("./models/purchase");

const PORT = process.env.PORT || 8000;

// create server
app.listen(PORT, async () => {
  // connect to database'
  console.log("Server listening on port", PORT);
  dbConnect();
});
