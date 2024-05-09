const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {
  // Register
    register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please provide all required fields: username, email, password." });
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
  // Add profile 
};

module.exports = userController;
