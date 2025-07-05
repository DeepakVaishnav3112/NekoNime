const User = require("../models/User");
const generateToken = require("../utils/jwt");

// Sign Up
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // Check if email exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    const err = new Error("Email already in use");
    err.status = 400;
    return next(err);
  }

  // Check if username exists
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    const err = new Error("Username already taken");
    err.status = 400;
    return next(err);
  }

  // Create new user
  const user = await User.create({ username, email, password });

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "User registered succesfully",
      user: { id: user._id, username: user.username },
    });
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid username or password" });

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "Login successful",
      user: { id: user._id, username: user.username },
    });
};

// Logout
exports.logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json({ message: "Logout successful" });
};
