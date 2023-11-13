const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoute = require("./routes/expense.routes");

require("dotenv").config();
const port = process.env.PORT;
const url = process.env.dbUrl;
const dbName = process.env.dbName;
const app = express();
app.use(cors());

mongoose.connect(
  "mongodb+srv://ngnghien5588:nguyenngochien@cluster0.f3ggmfp.mongodb.net/CSTP03"
);
mongoose.connection.on("open", () => {
  console.log("Connect to database successfully");
});
mongoose.connection.on("error", () => {
  console.log("Connect to database failed!");
});
app.use(bodyParser.json());
app.use(expenseRoute);

app.listen(3000, () => {
  console.log(`Listening port : 3000`);
});
