const User = require("../../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  const { id } = req.user;
  const users = await User.find();
  if (users.length > 0) {
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  }
  res.status(200).json({
    message: "No users found",
    data: [],
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  if (users.length > 0) {
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  }
  res.status(200).json({
    message: "No users found",
    data: [],
  });
};

// Add User
exports.addUser = async (req, res) => {
  const { name, email, password, phoneNumber, gender, address } = req.body;

  if (!name || !email || !password || !phoneNumber || !gender || !address) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    gender,
    address,
  });
  await newUser.save();

  res.status(201).json({
    message: "User added successfully",
    data: newUser,
  });
};
exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, gender, address } = req.body;

  // Validate required fields
  if (!name || !phoneNumber || !gender || !address) {
    return res.status(400).json({
      message:
        "Please provide all required fields name phoneNumber gender address",
    });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message: "User with that ID does not exist",
    });
  }

  user.name = name;
  user.phoneNumber = phoneNumber;
  user.gender = gender;
  user.address = address;

  const updatedUser = await user.save();

  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      message: "User with that ID does not exist",
    });
  }

  res.status(200).json({
    message: "User deleted successfully",
  });
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json({
      message: "Please provide email and password fields",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "No user with that email exists",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token, role: user.role });
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const users = await User.find();
    const tuitions = await Tuition.find();

    res.status(200).json({
      message: "Admin dashboard data fetched successfully",
      data: {
        users,
        tuitions,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching admin dashboard data",
      error: error.message,
    });
  }
};
