const { connectDatabase } = require("./config/dbConfig");

const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./route/userRoute");
const tuitionRoute = require("./route/tuitionRoute");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

connectDatabase();

app.listen(3000, (req, res) => {
  console.log("Satrted running at port 3000");
});
app.use("", userRoute);
app.use("", tuitionRoute);
