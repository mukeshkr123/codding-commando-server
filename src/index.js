require("dotenv").config();
const app = require("./app/app");
const dbConnect = require("./config/dbConnect");

const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.send("Welcome");
});

// create server
app.listen(PORT, () => {
  // connect to database'
  console.log("Server listening on port", PORT);
  dbConnect();
});
