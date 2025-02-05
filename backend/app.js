const { connectDatabase } = require("./config/dbConfig");

const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./route/userRoute");
const tuitionRoute = require("./route/tuitionRoute");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
const corsOptions = {
  origin: "https://job-platform-frontend-alpha.vercel.app", // Ensure this URL is correct
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDatabase();

app.listen(3000, () => {
  console.log("Started running at port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoute);
app.use("/tuitions", tuitionRoute);

module.exports = app;
