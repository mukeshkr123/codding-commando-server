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

  await Purchase.create({
    userId: "6597d5196e7987d8e9b14246",
    courseId: "6598e7979db6d7cccf8431eb",
    method: "installments",
    amount: "200",
  });
});
