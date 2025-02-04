const User = require("./model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const adminSeeding = async () => {
  // Check if admin already exists
  const adminExists = await User.findOne({ email: "admin@gmail.com" });
  if (!adminExists) {
    // Admin seeding
    await User.create({
      name: "admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      phoneNumber: "9811317964",
      gender: "male",
      address: "Biratnagar, BRT",
      role: "admin",
    });
    await User.create({
      name: "admin1",
      email: "admin1@gmail.com",
      password: bcrypt.hashSync(process.env.ADMIN1_PASSWORD, 10),
      phoneNumber: "9811317964",
      gender: "male",
      address: "Kathmandu, KTM",
      role: "admin",
    });
    console.log("Admin seeding successful");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = adminSeeding;
