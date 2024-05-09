const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      res.status(400).json({
        message:
          "Please provide all required fields: username, email, password.",
      });
      return;
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists." });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    // Create a user and save to the database
    const createdUser = await User.create({
      username,
      email,
      password: passwordHashed,
    });

    res.status(201).json({
      message: "User successfully registered.",
      user: {
        username: createdUser.username,
        email: createdUser.email,
        id: createdUser._id,
      },
    });
  }),
  // Add login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check the valid email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    //check the valid password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    // create and sign token
    const token = jwt.sign({ id: user._id }, "jeeva", {
      expiresIn: "3h",
    });
    res.json({
      message: "Successfully logged in",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }),
  // Add profile

  profile: asyncHandler(async (req, res) => {
    const user = await User.findById("663cd5850be11297640ff1a6");
    res.json({ username: user.username, email: user.email });
  }),
};
module.exports = userController;
