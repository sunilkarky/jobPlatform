const { default: mongoose } = require("mongoose");
const adminSeeding = require("../adminSeeding");
const catchAsync = require("../service/catchAsync");

exports.connectDatabase = async () => {
  //connecting to datbase
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected database");
  catchAsync(adminSeeding());
};
