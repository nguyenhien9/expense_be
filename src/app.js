const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoute = require("./routes/expense.routes");
const incomeRoute = require("./routes/income.routes");

require("dotenv").config();
const port = process.env.PORT;
const url = process.env.dbUrl;
const dbName = process.env.dbName;
const app = express();
app.use(cors());

mongoose.connect(`${url}/${dbName}`);
mongoose.connection.on("open", () => {
  console.log("Connect to database successfully");
});
mongoose.connection.on("error", () => {
  console.log("Connect to database failed!");
});
app.use(bodyParser.json());
app.use(expenseRoute);
app.use(incomeRoute);

app.listen(port, () => {
  console.log(`Listening port : ${port}`);
});